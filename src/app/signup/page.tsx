import { redirect } from "next/navigation";
import { USER_REGISTER_PATH } from "@/lib/auth-paths";

export default async function LegacySignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") query.set(key, value);
  }
  const suffix = query.toString() ? `?${query.toString()}` : "";
  redirect(`${USER_REGISTER_PATH}${suffix}`);
}
