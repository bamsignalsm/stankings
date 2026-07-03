import Link from "next/link";
import { createCareerPost } from "../../actions";
import { COMPANY_AREAS, EMPLOYMENT_TYPES } from "@/lib/careers";
import { CareerPostForm } from "@/components/energy/CareerPostForm";

export default function NewCareerPostPage() {
  return (
    <div>
      <Link
        href="/energy/careers"
        className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
      >
        ← Back to careers
      </Link>
      <h1 className="mb-8 font-serif text-3xl font-semibold text-cream">
        New Career Post
      </h1>
      <CareerPostForm action={createCareerPost} />
    </div>
  );
}
