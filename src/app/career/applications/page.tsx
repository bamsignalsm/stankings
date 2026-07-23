import { redirect } from "next/navigation";

/** Applicant tracking lives on the Passport applicant dashboard. */
export default function CareerApplicationsRedirect() {
  redirect("/passport/applicant");
}
