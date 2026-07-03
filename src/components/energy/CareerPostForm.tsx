import { COMPANY_AREAS, EMPLOYMENT_TYPES } from "@/lib/careers";
import type { CareerPost } from "@/lib/types";

interface CareerPostFormProps {
  action: (formData: FormData) => Promise<void>;
  post?: CareerPost;
}

export function CareerPostForm({ action, post }: CareerPostFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Job title" name="title" defaultValue={post?.title} required />
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Company area
        </label>
        <select
          name="company_area"
          required
          defaultValue={post?.company_area}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
        >
          <option value="">Select area</option>
          {COMPANY_AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <Field
        label="Location"
        name="location"
        defaultValue={post?.location ?? "Lagos, Nigeria"}
      />
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Employment type
        </label>
        <select
          name="employment_type"
          defaultValue={post?.employment_type ?? "full-time"}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
        >
          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={6}
          defaultValue={post?.description}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Requirements
        </label>
        <textarea
          name="requirements"
          rows={4}
          defaultValue={post?.requirements ?? ""}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
          Status
        </label>
        <select
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-sm border border-gold bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light"
      >
        {post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
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
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
      />
    </div>
  );
}
