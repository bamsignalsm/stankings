"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { submitCareerApplication } from "@/app/energy/(console)/actions";
import {
  emptyAtsProfile,
  resolveRoleQuestions,
  SKILL_TAG_SUGGESTIONS,
  type AtsApplicationProfile,
  type RoleQuestion,
} from "@/lib/careers/ats-schema";
import { STANKINGS_HQ_LOCATION } from "@/lib/careers/location";

const STEPS = [
  "Personal",
  "Identity",
  "Education",
  "Experience",
  "Skills",
  "Availability",
  "Role",
  "Documents",
  "Review",
] as const;

interface EnterpriseApplyFormProps {
  postId: string;
  postTitle: string;
  workspaceKey?: string | null;
  roleQuestions?: RoleQuestion[] | null;
  defaultEmail?: string;
  defaultName?: string;
  passportId?: string | null;
}

export function ApplyForm(props: EnterpriseApplyFormProps) {
  return <EnterpriseApplyForm {...props} />;
}

export function EnterpriseApplyForm({
  postId,
  postTitle,
  workspaceKey,
  roleQuestions,
  defaultEmail = "",
  defaultName = "",
  passportId = null,
}: EnterpriseApplyFormProps) {
  const storageKey = `stankings.ats.draft.${postId}`;
  const questions = useMemo(
    () => resolveRoleQuestions(workspaceKey, roleQuestions),
    [workspaceKey, roleQuestions]
  );

  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<AtsApplicationProfile>(() =>
    emptyAtsProfile({ fullName: defaultName, email: defaultEmail })
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AtsApplicationProfile;
      if (parsed?.schemaVersion === 1) {
        setProfile({
          ...parsed,
          personal: {
            ...parsed.personal,
            email: parsed.personal.email || defaultEmail,
            fullLegalName: parsed.personal.fullLegalName || defaultName,
          },
        });
        setSavedAt("Restored draft");
      }
    } catch {
      // ignore corrupt drafts
    }
  }, [storageKey, defaultEmail, defaultName]);

  const persist = useCallback(
    (next: AtsApplicationProfile) => {
      setProfile(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        setSavedAt(new Date().toLocaleTimeString());
      } catch {
        // quota
      }
    },
    [storageKey]
  );

  function updatePersonal<K extends keyof AtsApplicationProfile["personal"]>(
    key: K,
    value: AtsApplicationProfile["personal"][K]
  ) {
    persist({
      ...profile,
      personal: { ...profile.personal, [key]: value },
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    const c = profile.compliance;
    if (
      !c.informationAccurate ||
      !c.backgroundChecksConsent ||
      !c.privacyPolicyAccepted ||
      !c.recruitmentConsent
    ) {
      setError("Please complete all required compliance confirmations.");
      setLoading(false);
      setStep(STEPS.length - 1);
      return;
    }
    if (!profile.personal.fullLegalName || !profile.personal.email) {
      setError("Full legal name and email are required.");
      setLoading(false);
      setStep(0);
      return;
    }
    const filledRefs = profile.references.filter((r) => r.name && r.email);
    if (filledRefs.length < 2) {
      setError("Provide at least two professional references.");
      setLoading(false);
      setStep(4);
      return;
    }

    const formData = new FormData();
    formData.set("post_id", postId);
    formData.set("full_name", profile.personal.fullLegalName);
    formData.set("preferred_name", profile.personal.preferredName);
    formData.set("email", profile.personal.email);
    formData.set("phone", profile.personal.phone);
    formData.set("linkedin_url", profile.profiles.linkedin);
    formData.set("cover_letter", profile.coverLetter);
    formData.set("ats_profile", JSON.stringify(profile));
    if (passportId) formData.set("existing_passport_id", passportId);

    try {
      await submitCareerApplication(formData);
      localStorage.removeItem(storageKey);
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
          Thank you for applying to {postTitle}. Track progress on your{" "}
          <Link href="/passport/applicant" className="text-gold hover:text-gold-light">
            Applicant Dashboard
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-sm border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream-muted">
        <p>
          Work location HQ:{" "}
          <span className="text-cream">{STANKINGS_HQ_LOCATION.display}</span>
        </p>
        {passportId ? (
          <p className="mt-1 font-mono text-xs">Passport: {passportId}</p>
        ) : (
          <p className="mt-1 text-xs">
            Applying creates or reuses your Stankings Passport — never a second identity.
          </p>
        )}
        {savedAt ? (
          <p className="mt-1 text-xs text-gold">Draft autosaved · {savedAt}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`rounded-sm px-2 py-1 text-xs ${
              i === step ? "bg-gold text-ink" : "border border-gold-subtle text-cream-muted"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <Section title="Personal information">
          <Field
            label="Full legal name"
            value={profile.personal.fullLegalName}
            onChange={(v) => updatePersonal("fullLegalName", v)}
            required
          />
          <Field
            label="Preferred name"
            value={profile.personal.preferredName}
            onChange={(v) => updatePersonal("preferredName", v)}
          />
          <Field
            label="Email"
            type="email"
            value={profile.personal.email}
            onChange={(v) => updatePersonal("email", v)}
            required
          />
          <Field
            label="Phone"
            value={profile.personal.phone}
            onChange={(v) => updatePersonal("phone", v)}
          />
          <Field
            label="Alternative phone"
            value={profile.personal.alternativePhone}
            onChange={(v) => updatePersonal("alternativePhone", v)}
          />
          <Field
            label="Date of birth"
            type="date"
            value={profile.personal.dateOfBirth}
            onChange={(v) => updatePersonal("dateOfBirth", v)}
          />
          <Field
            label="Gender (optional)"
            value={profile.personal.gender}
            onChange={(v) => updatePersonal("gender", v)}
          />
          <Field
            label="Nationality"
            value={profile.personal.nationality}
            onChange={(v) => updatePersonal("nationality", v)}
          />
          <Field
            label="State of origin"
            value={profile.personal.stateOfOrigin}
            onChange={(v) => updatePersonal("stateOfOrigin", v)}
          />
          <Field
            label="LGA"
            value={profile.personal.lga}
            onChange={(v) => updatePersonal("lga", v)}
          />
          <Field
            label="Residential address"
            value={profile.personal.residentialAddress}
            onChange={(v) => updatePersonal("residentialAddress", v)}
          />
          <Field
            label="Current city"
            value={profile.personal.currentCity}
            onChange={(v) => updatePersonal("currentCity", v)}
          />
          <Field
            label="Current state"
            value={profile.personal.currentState}
            onChange={(v) => updatePersonal("currentState", v)}
          />
          <Field
            label="Country"
            value={profile.personal.country}
            onChange={(v) => updatePersonal("country", v)}
          />
        </Section>
      )}

      {step === 1 && (
        <Section title="Identity verification">
          <Field
            label="Means of identification"
            value={profile.identity.meansOfIdentification}
            onChange={(v) =>
              persist({
                ...profile,
                identity: { ...profile.identity, meansOfIdentification: v },
              })
            }
            placeholder="NIN / Passport / Driver’s licence"
          />
          <Field
            label="ID number"
            value={profile.identity.idNumber}
            onChange={(v) =>
              persist({ ...profile, identity: { ...profile.identity, idNumber: v } })
            }
          />
          <Field
            label="Expiry date"
            type="date"
            value={profile.identity.expiryDate}
            onChange={(v) =>
              persist({ ...profile, identity: { ...profile.identity, expiryDate: v } })
            }
          />
          <p className="text-xs text-cream-muted">
            Upload ID on the Documents step. Recruiters review ID after Passport verification.
          </p>
        </Section>
      )}

      {step === 2 && (
        <Section title="Education & certifications">
          <Repeatable
            label="Education"
            onAdd={() =>
              persist({
                ...profile,
                education: [
                  ...profile.education,
                  {
                    institution: "",
                    qualification: "",
                    course: "",
                    grade: "",
                    startDate: "",
                    endDate: "",
                    currentlyStudying: false,
                  },
                ],
              })
            }
          >
            {profile.education.map((ed, i) => (
              <div key={i} className="space-y-2 rounded-sm border border-gold-subtle p-3">
                <Field
                  label="Institution"
                  value={ed.institution}
                  onChange={(v) => {
                    const education = [...profile.education];
                    education[i] = { ...ed, institution: v };
                    persist({ ...profile, education });
                  }}
                />
                <Field
                  label="Qualification"
                  value={ed.qualification}
                  onChange={(v) => {
                    const education = [...profile.education];
                    education[i] = { ...ed, qualification: v };
                    persist({ ...profile, education });
                  }}
                />
                <Field
                  label="Course"
                  value={ed.course}
                  onChange={(v) => {
                    const education = [...profile.education];
                    education[i] = { ...ed, course: v };
                    persist({ ...profile, education });
                  }}
                />
                <Field
                  label="Grade"
                  value={ed.grade}
                  onChange={(v) => {
                    const education = [...profile.education];
                    education[i] = { ...ed, grade: v };
                    persist({ ...profile, education });
                  }}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field
                    label="Start"
                    type="month"
                    value={ed.startDate}
                    onChange={(v) => {
                      const education = [...profile.education];
                      education[i] = { ...ed, startDate: v };
                      persist({ ...profile, education });
                    }}
                  />
                  <Field
                    label="End"
                    type="month"
                    value={ed.endDate}
                    onChange={(v) => {
                      const education = [...profile.education];
                      education[i] = { ...ed, endDate: v };
                      persist({ ...profile, education });
                    }}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-cream-muted">
                  <input
                    type="checkbox"
                    checked={ed.currentlyStudying}
                    onChange={(e) => {
                      const education = [...profile.education];
                      education[i] = { ...ed, currentlyStudying: e.target.checked };
                      persist({ ...profile, education });
                    }}
                  />
                  Currently studying
                </label>
              </div>
            ))}
          </Repeatable>

          <Repeatable
            label="Certifications"
            onAdd={() =>
              persist({
                ...profile,
                certifications: [
                  ...profile.certifications,
                  {
                    certificate: "",
                    issuer: "",
                    date: "",
                    credentialId: "",
                    credentialUrl: "",
                  },
                ],
              })
            }
          >
            {profile.certifications.map((c, i) => (
              <div key={i} className="space-y-2 rounded-sm border border-gold-subtle p-3">
                <Field
                  label="Certificate"
                  value={c.certificate}
                  onChange={(v) => {
                    const certifications = [...profile.certifications];
                    certifications[i] = { ...c, certificate: v };
                    persist({ ...profile, certifications });
                  }}
                />
                <Field
                  label="Issuer"
                  value={c.issuer}
                  onChange={(v) => {
                    const certifications = [...profile.certifications];
                    certifications[i] = { ...c, issuer: v };
                    persist({ ...profile, certifications });
                  }}
                />
                <Field
                  label="Date"
                  type="month"
                  value={c.date}
                  onChange={(v) => {
                    const certifications = [...profile.certifications];
                    certifications[i] = { ...c, date: v };
                    persist({ ...profile, certifications });
                  }}
                />
                <Field
                  label="Credential ID"
                  value={c.credentialId}
                  onChange={(v) => {
                    const certifications = [...profile.certifications];
                    certifications[i] = { ...c, credentialId: v };
                    persist({ ...profile, certifications });
                  }}
                />
                <Field
                  label="Credential URL"
                  value={c.credentialUrl}
                  onChange={(v) => {
                    const certifications = [...profile.certifications];
                    certifications[i] = { ...c, credentialUrl: v };
                    persist({ ...profile, certifications });
                  }}
                />
              </div>
            ))}
          </Repeatable>
        </Section>
      )}

      {step === 3 && (
        <Section title="Employment history">
          <Repeatable
            label="Roles"
            onAdd={() =>
              persist({
                ...profile,
                employmentHistory: [
                  ...profile.employmentHistory,
                  {
                    employer: "",
                    position: "",
                    department: "",
                    employmentType: "full-time",
                    startDate: "",
                    endDate: "",
                    currentEmployer: false,
                    responsibilities: "",
                    achievements: "",
                    reasonForLeaving: "",
                  },
                ],
              })
            }
          >
            {profile.employmentHistory.map((job, i) => (
              <div key={i} className="space-y-2 rounded-sm border border-gold-subtle p-3">
                <Field
                  label="Employer"
                  value={job.employer}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, employer: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <Field
                  label="Position"
                  value={job.position}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, position: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <Field
                  label="Department"
                  value={job.department}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, department: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <TextArea
                  label="Responsibilities"
                  value={job.responsibilities}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, responsibilities: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <TextArea
                  label="Achievements"
                  value={job.achievements}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, achievements: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <Field
                  label="Reason for leaving"
                  value={job.reasonForLeaving}
                  onChange={(v) => {
                    const employmentHistory = [...profile.employmentHistory];
                    employmentHistory[i] = { ...job, reasonForLeaving: v };
                    persist({ ...profile, employmentHistory });
                  }}
                />
                <label className="flex items-center gap-2 text-sm text-cream-muted">
                  <input
                    type="checkbox"
                    checked={job.currentEmployer}
                    onChange={(e) => {
                      const employmentHistory = [...profile.employmentHistory];
                      employmentHistory[i] = {
                        ...job,
                        currentEmployer: e.target.checked,
                      };
                      persist({ ...profile, employmentHistory });
                    }}
                  />
                  Current employer
                </label>
              </div>
            ))}
          </Repeatable>
        </Section>
      )}

      {step === 4 && (
        <Section title="Skills, languages & references">
          <div className="flex flex-wrap gap-2">
            {SKILL_TAG_SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                className="rounded-sm border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:border-gold"
                onClick={() => {
                  if (profile.skills.some((s) => s.skill === tag)) return;
                  persist({
                    ...profile,
                    skills: [
                      ...profile.skills,
                      {
                        skill: tag,
                        yearsOfExperience: null,
                        selfRating: null,
                        assessmentScore: null,
                      },
                    ],
                  });
                }}
              >
                + {tag}
              </button>
            ))}
          </div>
          {profile.skills.map((s, i) => (
            <div key={i} className="grid gap-2 rounded-sm border border-gold-subtle p-3 sm:grid-cols-3">
              <Field
                label="Skill"
                value={s.skill}
                onChange={(v) => {
                  const skills = [...profile.skills];
                  skills[i] = { ...s, skill: v };
                  persist({ ...profile, skills });
                }}
              />
              <Field
                label="Years"
                type="number"
                value={s.yearsOfExperience?.toString() ?? ""}
                onChange={(v) => {
                  const skills = [...profile.skills];
                  skills[i] = {
                    ...s,
                    yearsOfExperience: v ? Number(v) : null,
                  };
                  persist({ ...profile, skills });
                }}
              />
              <Field
                label="Self-rating (1–5)"
                type="number"
                value={s.selfRating?.toString() ?? ""}
                onChange={(v) => {
                  const skills = [...profile.skills];
                  skills[i] = { ...s, selfRating: v ? Number(v) : null };
                  persist({ ...profile, skills });
                }}
              />
            </div>
          ))}

          <Repeatable
            label="Languages"
            onAdd={() =>
              persist({
                ...profile,
                languages: [
                  ...profile.languages,
                  {
                    language: "",
                    speaking: "",
                    reading: "",
                    writing: "",
                    fluencyLevel: "",
                  },
                ],
              })
            }
          >
            {profile.languages.map((lang, i) => (
              <div key={i} className="grid gap-2 rounded-sm border border-gold-subtle p-3 sm:grid-cols-2">
                <Field
                  label="Language"
                  value={lang.language}
                  onChange={(v) => {
                    const languages = [...profile.languages];
                    languages[i] = { ...lang, language: v };
                    persist({ ...profile, languages });
                  }}
                />
                <Field
                  label="Fluency"
                  value={lang.fluencyLevel}
                  onChange={(v) => {
                    const languages = [...profile.languages];
                    languages[i] = { ...lang, fluencyLevel: v };
                    persist({ ...profile, languages });
                  }}
                />
              </div>
            ))}
          </Repeatable>

          <p className="text-sm text-cream">Professional references (minimum 2)</p>
          {profile.references.map((ref, i) => (
            <div key={i} className="space-y-2 rounded-sm border border-gold-subtle p-3">
              <p className="text-xs text-gold">Reference {i + 1}</p>
              <Field
                label="Name"
                value={ref.name}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, name: v };
                  persist({ ...profile, references });
                }}
              />
              <Field
                label="Organization"
                value={ref.organization}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, organization: v };
                  persist({ ...profile, references });
                }}
              />
              <Field
                label="Position"
                value={ref.position}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, position: v };
                  persist({ ...profile, references });
                }}
              />
              <Field
                label="Phone"
                value={ref.phone}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, phone: v };
                  persist({ ...profile, references });
                }}
              />
              <Field
                label="Email"
                type="email"
                value={ref.email}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, email: v };
                  persist({ ...profile, references });
                }}
              />
              <Field
                label="Relationship"
                value={ref.relationship}
                onChange={(v) => {
                  const references = [...profile.references];
                  references[i] = { ...ref, relationship: v };
                  persist({ ...profile, references });
                }}
              />
            </div>
          ))}
        </Section>
      )}

      {step === 5 && (
        <Section title="Availability & profiles">
          <Field
            label="Notice period"
            value={profile.availability.noticePeriod}
            onChange={(v) =>
              persist({
                ...profile,
                availability: { ...profile.availability, noticePeriod: v },
              })
            }
          />
          <Field
            label="Earliest start date"
            type="date"
            value={profile.availability.earliestStartDate}
            onChange={(v) =>
              persist({
                ...profile,
                availability: { ...profile.availability, earliestStartDate: v },
              })
            }
          />
          <Field
            label="Current employment status"
            value={profile.availability.currentEmploymentStatus}
            onChange={(v) =>
              persist({
                ...profile,
                availability: {
                  ...profile.availability,
                  currentEmploymentStatus: v,
                },
              })
            }
          />
          <Field
            label="Current salary (optional)"
            value={profile.availability.currentSalary}
            onChange={(v) =>
              persist({
                ...profile,
                availability: { ...profile.availability, currentSalary: v },
              })
            }
          />
          <Field
            label="Expected salary"
            value={profile.availability.expectedSalary}
            onChange={(v) =>
              persist({
                ...profile,
                availability: { ...profile.availability, expectedSalary: v },
              })
            }
          />
          <Field
            label="LinkedIn"
            value={profile.profiles.linkedin}
            onChange={(v) =>
              persist({
                ...profile,
                profiles: { ...profile.profiles, linkedin: v },
              })
            }
          />
          <Field
            label="GitHub"
            value={profile.profiles.github}
            onChange={(v) =>
              persist({
                ...profile,
                profiles: { ...profile.profiles, github: v },
              })
            }
          />
          <Field
            label="Portfolio"
            value={profile.profiles.portfolio}
            onChange={(v) =>
              persist({
                ...profile,
                profiles: { ...profile.profiles, portfolio: v },
              })
            }
          />
          <Field
            label="Personal website"
            value={profile.profiles.personalWebsite}
            onChange={(v) =>
              persist({
                ...profile,
                profiles: { ...profile.profiles, personalWebsite: v },
              })
            }
          />
          <label className="flex items-center gap-2 text-sm text-cream-muted">
            <input
              type="checkbox"
              checked={profile.availability.willingToRelocate === true}
              onChange={(e) =>
                persist({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    willingToRelocate: e.target.checked,
                  },
                })
              }
            />
            Willing to relocate to Abia State / HQ
          </label>
          <label className="flex items-center gap-2 text-sm text-cream-muted">
            <input
              type="checkbox"
              checked={profile.availability.willingToTravel === true}
              onChange={(e) =>
                persist({
                  ...profile,
                  availability: {
                    ...profile.availability,
                    willingToTravel: e.target.checked,
                  },
                })
              }
            />
            Willing to travel
          </label>
        </Section>
      )}

      {step === 6 && (
        <Section title="Role-specific questions">
          {questions.map((q) => (
            <TextArea
              key={q.id}
              label={q.label + (q.required ? " *" : "")}
              value={profile.roleAnswers[q.id] ?? ""}
              onChange={(v) =>
                persist({
                  ...profile,
                  roleAnswers: { ...profile.roleAnswers, [q.id]: v },
                })
              }
            />
          ))}
          <TextArea
            label="Cover letter"
            value={profile.coverLetter}
            onChange={(v) => persist({ ...profile, coverLetter: v })}
          />
        </Section>
      )}

      {step === 7 && (
        <Section title="Documents">
          <p className="text-sm text-cream-muted">
            Paste secure links for now (CV, ID, portfolio, photograph). File-bucket upload
            paths are stored on submit when provided via URL.
          </p>
          <Field
            label="CV / Resume URL"
            value={
              profile.documents.find((d) => d.kind === "cv")?.url ?? ""
            }
            onChange={(v) => {
              const others = profile.documents.filter((d) => d.kind !== "cv");
              persist({
                ...profile,
                documents: [
                  ...others,
                  {
                    kind: "cv",
                    fileName: "cv",
                    storagePath: null,
                    url: v,
                  },
                ],
              });
            }}
          />
          <Field
            label="ID document URL"
            value={
              profile.documents.find((d) => d.kind === "id_document")?.url ?? ""
            }
            onChange={(v) => {
              const others = profile.documents.filter((d) => d.kind !== "id_document");
              persist({
                ...profile,
                documents: [
                  ...others,
                  {
                    kind: "id_document",
                    fileName: "id",
                    storagePath: null,
                    url: v,
                  },
                ],
              });
            }}
          />
          <Field
            label="Passport photograph URL"
            value={
              profile.documents.find((d) => d.kind === "passport_photo")?.url ?? ""
            }
            onChange={(v) => {
              const others = profile.documents.filter(
                (d) => d.kind !== "passport_photo"
              );
              persist({
                ...profile,
                documents: [
                  ...others,
                  {
                    kind: "passport_photo",
                    fileName: "photo",
                    storagePath: null,
                    url: v,
                  },
                ],
              });
            }}
          />
        </Section>
      )}

      {step === 8 && (
        <Section title="Review & compliance">
          <p className="text-sm text-cream-muted">
            Submitting as <span className="text-cream">{profile.personal.fullLegalName}</span>{" "}
            · {profile.personal.email}
          </p>
          <p className="text-sm text-cream-muted">
            Education: {profile.education.length} · Employment:{" "}
            {profile.employmentHistory.length} · Skills: {profile.skills.length} ·
            References: {profile.references.filter((r) => r.name).length}
          </p>
          {(
            [
              ["informationAccurate", "I confirm the information provided is accurate"],
              [
                "backgroundChecksConsent",
                "I consent to background checks as part of recruitment",
              ],
              ["privacyPolicyAccepted", "I accept the Stankings Privacy Policy"],
              ["recruitmentConsent", "I consent to processing for recruitment"],
              [
                "talentPoolConsent",
                "Keep my profile in the Stankings Talent Pool (optional)",
              ],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-start gap-2 text-sm text-cream-muted">
              <input
                type="checkbox"
                className="mt-1"
                checked={profile.compliance[key]}
                onChange={(e) =>
                  persist({
                    ...profile,
                    compliance: {
                      ...profile.compliance,
                      [key]: e.target.checked,
                    },
                  })
                }
              />
              {label}
            </label>
          ))}
        </Section>
      )}

      {error && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-sm border border-gold-subtle px-4 py-2 text-sm text-cream"
          >
            Back
          </button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-sm border border-gold bg-gold px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="font-serif text-xl text-cream">{title}</h3>
      {children}
    </section>
  );
}

function Repeatable({
  label,
  onAdd,
  children,
}: {
  label: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-cream">{label}</p>
        <button type="button" onClick={onAdd} className="text-xs text-gold">
          Add
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-muted">
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream"
      />
    </div>
  );
}
