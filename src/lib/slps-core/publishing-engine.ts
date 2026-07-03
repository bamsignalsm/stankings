/**
 * SLPS-CORE Module 5 — Publishing Engine
 * Single source → multiple institutional outputs.
 */

export type PublishingOutputFormat =
  | "web"
  | "print_pdf"
  | "hardcover"
  | "epub"
  | "docx"
  | "markdown";

export type PublishingOutputStatus = "available" | "planned" | "in_development";

export interface PublishingOutput {
  format: PublishingOutputFormat;
  label: string;
  description: string;
  status: PublishingOutputStatus;
  mimeType: string;
}

export const PUBLISHING_OUTPUTS: readonly PublishingOutput[] = [
  {
    format: "web",
    label: "Website",
    description: "Primary Library rendering — stankings.com/library",
    status: "available",
    mimeType: "text/html",
  },
  {
    format: "print_pdf",
    label: "Print-ready PDF",
    description: "CMYK-ready PDF with institutional typography and margins",
    status: "planned",
    mimeType: "application/pdf",
  },
  {
    format: "hardcover",
    label: "Hardcover Layout",
    description: "Spine, cover, and interior layout for physical binding",
    status: "planned",
    mimeType: "application/pdf",
  },
  {
    format: "epub",
    label: "EPUB",
    description: "Reflowable ebook for institutional distribution",
    status: "planned",
    mimeType: "application/epub+zip",
  },
  {
    format: "docx",
    label: "DOCX",
    description: "Editable export for legal review and external counsel",
    status: "planned",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    format: "markdown",
    label: "Markdown",
    description: "Source export for version control and archival",
    status: "in_development",
    mimeType: "text/markdown",
  },
] as const;

export interface PublishRequest {
  publicationId: string;
  formats: PublishingOutputFormat[];
  includeMetadata: boolean;
  includeRevisionHistory: boolean;
}

export interface PublishResult {
  publicationId: string;
  requestedAt: string;
  outputs: {
    format: PublishingOutputFormat;
    status: "ready" | "queued" | "unavailable";
    message: string;
  }[];
}

/** Queue a multi-format publish job. Web is available; other formats are planned. */
export function requestPublicationExport(request: PublishRequest): PublishResult {
  const now = new Date().toISOString();

  return {
    publicationId: request.publicationId,
    requestedAt: now,
    outputs: request.formats.map((format) => {
      const output = PUBLISHING_OUTPUTS.find((o) => o.format === format);
      if (!output) {
        return { format, status: "unavailable" as const, message: "Unknown format." };
      }
      if (output.status === "available") {
        return {
          format,
          status: "ready" as const,
          message: `${output.label} rendering available via Library routes.`,
        };
      }
      return {
        format,
        status: "queued" as const,
        message: `${output.label} — planned for SLPS-CORE Publishing Engine phase 2.`,
      };
    }),
  };
}

export function getAvailablePublishingFormats(): PublishingOutput[] {
  return PUBLISHING_OUTPUTS.filter((o) => o.status === "available");
}
