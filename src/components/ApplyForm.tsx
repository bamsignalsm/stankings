"use client";

import { useState } from "react";
import { submitCareerApplication } from "@/app/energy/(console)/actions";

interface ApplyFormProps {
  postId: string;
  postTitle: string;
  defaultEmail?: string;
  defaultName?: string;
}

export function ApplyForm({
  postId,
  postTitle,
  defaultEmail = "",
  defaultName = "",
}: ApplyFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("post_id", postId);

    try {
      await submitCareerApplication(formData);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Application failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-6">
        <p className="font-medium text-emerald-300">Application submitted</p>
        <p className="mt-2 text-sm text-cream-muted">
          Thank you for applying to {postTitle}. The Stankings Legacy Ltd recruitment
          team will review your application.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="post_id" value={postId} />
      <Field label="Full name" name="full_name" defaultValue={defaultName} required />
      <Field label="Email" name="email" type="email" defaultValue={defaultEmail} required />
      <Field label="Phone" name="phone" />
      <Field label="LinkedIn URL" name="linkedin_url" />
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Cover letter
        </label>
        <textarea
          name="cover_letter"
          rows={5}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
          placeholder="Tell us why you want to join Stankings Legacy Ltd..."
        />
      </div>
      {error && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm border border-gold bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
      />
    </div>
  );
}
