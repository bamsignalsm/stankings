/**
 * Supabase / Postgres IdentityStore adapter.
 * Uses a minimal client interface so tests can inject mocks.
 * Schema: docs/platform/IDENTITY_MIGRATION.md + supabase/migrations/*_shared_identity_persistence.sql
 */

import type {
  IdentityStore,
  IdentityStoreWriteResult,
  PersistentIdentityBundle,
} from "./types";
import { checkVersionConflict, cloneBundle } from "./helpers";
import { IDENTITY_SCHEMA_VERSION } from "../identity/versions";

/** Minimal Supabase-like client surface used by this adapter. */
export interface IdentitySupabaseClient {
  from: (table: string) => {
    select: (columns?: string) => {
      eq: (
        column: string,
        value: string,
      ) => {
        maybeSingle: () => Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>;
        limit: (
          n: number,
        ) => Promise<{ data: Record<string, unknown>[] | null; error: { message: string } | null }>;
      };
      limit: (
        n: number,
      ) => Promise<{ data: Record<string, unknown>[] | null; error: { message: string } | null }>;
    };
    upsert: (
      row: Record<string, unknown>,
      opts?: { onConflict?: string },
    ) => Promise<{ error: { message: string } | null }>;
    delete: () => {
      eq: (
        column: string,
        value: string,
      ) => Promise<{ error: { message: string } | null }>;
    };
  };
}

const TABLE = "shared_identity_subjects";
const EXT_TABLE = "shared_identity_external_refs";

function rowToBundle(row: Record<string, unknown>): PersistentIdentityBundle {
  return {
    subject: {
      subjectId: String(row.subject_id),
      kind: row.kind as PersistentIdentityBundle["subject"]["kind"],
      state: row.state as PersistentIdentityBundle["subject"]["state"],
      authority: "stankings-shared-identity",
      version: Number(row.version),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      displayLabel: row.display_label ? String(row.display_label) : undefined,
      metadata: (row.metadata as Record<string, string> | null) ?? undefined,
      originPlatformId: row.origin_platform_id
        ? String(row.origin_platform_id)
        : undefined,
      externalRefs: (row.external_refs as PersistentIdentityBundle["subject"]["externalRefs"]) ?? [],
    },
    memberships: (row.memberships as PersistentIdentityBundle["memberships"]) ?? [],
    roleClaims: (row.role_claims as PersistentIdentityBundle["roleClaims"]) ?? [],
    platformParticipation:
      (row.platform_participation as PersistentIdentityBundle["platformParticipation"]) ?? [],
  };
}

function bundleToRow(bundle: PersistentIdentityBundle): Record<string, unknown> {
  return {
    subject_id: bundle.subject.subjectId,
    kind: bundle.subject.kind,
    state: bundle.subject.state,
    authority: bundle.subject.authority,
    version: bundle.subject.version,
    schema_version: IDENTITY_SCHEMA_VERSION,
    created_at: bundle.subject.createdAt,
    updated_at: bundle.subject.updatedAt,
    display_label: bundle.subject.displayLabel ?? null,
    metadata: bundle.subject.metadata ?? {},
    origin_platform_id: bundle.subject.originPlatformId ?? null,
    external_refs: bundle.subject.externalRefs,
    memberships: bundle.memberships,
    role_claims: bundle.roleClaims,
    platform_participation: bundle.platformParticipation,
  };
}

export class SupabaseIdentityStore implements IdentityStore {
  readonly providerId = "supabase";

  constructor(private readonly client: IdentitySupabaseClient) {}

  async getSubject(subjectId: string): Promise<PersistentIdentityBundle | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("subject_id", subjectId)
      .maybeSingle();
    if (error) throw new Error(`SupabaseIdentityStore.getSubject: ${error.message}`);
    return data ? cloneBundle(rowToBundle(data)) : null;
  }

  async findByExternalRef(
    system: string,
    externalId: string,
  ): Promise<PersistentIdentityBundle | null> {
    const { data, error } = await this.client
      .from(EXT_TABLE)
      .select("subject_id")
      .eq("ref_key", `${system}::${externalId}`)
      .maybeSingle();
    if (error) throw new Error(`SupabaseIdentityStore.findByExternalRef: ${error.message}`);
    if (!data?.subject_id) return null;
    return this.getSubject(String(data.subject_id));
  }

  async putSubject(bundle: PersistentIdentityBundle): Promise<IdentityStoreWriteResult> {
    const existing = await this.getSubject(bundle.subject.subjectId);
    const conflict = checkVersionConflict(existing, bundle);
    if (conflict) return conflict;

    // Check external ref ownership via index table
    for (const ref of bundle.subject.externalRefs) {
      const key = `${ref.system}::${ref.externalId}`;
      const { data, error } = await this.client
        .from(EXT_TABLE)
        .select("subject_id")
        .eq("ref_key", key)
        .maybeSingle();
      if (error) {
        return { ok: false, errors: [`external ref lookup failed: ${error.message}`] };
      }
      if (data?.subject_id && String(data.subject_id) !== bundle.subject.subjectId) {
        return {
          ok: false,
          errors: [`external ref ${key} already mapped to ${data.subject_id}`],
        };
      }
    }

    const row = bundleToRow(bundle);
    const { error: upsertError } = await this.client
      .from(TABLE)
      .upsert(row, { onConflict: "subject_id" });
    if (upsertError) {
      return { ok: false, errors: [`upsert failed: ${upsertError.message}`] };
    }

    // Replace external refs for this subject
    const { error: delError } = await this.client
      .from(EXT_TABLE)
      .delete()
      .eq("subject_id", bundle.subject.subjectId);
    if (delError) {
      return { ok: false, errors: [`external ref clear failed: ${delError.message}`] };
    }

    for (const ref of bundle.subject.externalRefs) {
      const { error: refError } = await this.client.from(EXT_TABLE).upsert(
        {
          ref_key: `${ref.system}::${ref.externalId}`,
          system: ref.system,
          external_id: ref.externalId,
          subject_id: bundle.subject.subjectId,
          linked: ref.linked,
        },
        { onConflict: "ref_key" },
      );
      if (refError) {
        return { ok: false, errors: [`external ref upsert failed: ${refError.message}`] };
      }
    }

    return { ok: true, errors: [], bundle: cloneBundle(bundle) };
  }

  async listSubjects(limit = 100): Promise<PersistentIdentityBundle[]> {
    const { data, error } = await this.client.from(TABLE).select("*").limit(limit);
    if (error) throw new Error(`SupabaseIdentityStore.listSubjects: ${error.message}`);
    return (data ?? []).map((row) => cloneBundle(rowToBundle(row)));
  }
}

export function createSupabaseIdentityStore(client: IdentitySupabaseClient): IdentityStore {
  return new SupabaseIdentityStore(client);
}
