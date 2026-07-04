"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SUPPORT_FAQS,
  SUPPORT_KNOWLEDGE_BASE,
  SUPPORT_QUEUES,
  type SupportQueue,
} from "@/lib/authority/support";
import { FormField, Input, Textarea } from "@/components/ui";

export function SupportExperience() {
  const [selected, setSelected] = useState(SUPPORT_QUEUES[0].slug);
  const queue = useMemo(
    () => SUPPORT_QUEUES.find((q) => q.slug === selected) ?? SUPPORT_QUEUES[0],
    [selected],
  );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-3 font-serif text-2xl text-cream">Product selector</h2>
        <p className="mb-4 text-sm text-cream-muted">
          Choose the correct queue. Policies originate at HQ; product teams operate product systems.
        </p>
        <div className="flex flex-wrap gap-2">
          {SUPPORT_QUEUES.map((q) => (
            <button
              key={q.slug}
              type="button"
              onClick={() => setSelected(q.slug)}
              className={`rounded-sm border px-3 py-2 text-sm transition ${
                selected === q.slug
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold-subtle text-cream-muted hover:border-gold/40"
              }`}
            >
              {q.name}
            </button>
          ))}
        </div>
      </section>

      <QueuePanel queue={queue} />

      <section>
        <h2 className="mb-4 font-serif text-2xl text-cream">Knowledge base</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SUPPORT_KNOWLEDGE_BASE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
            >
              <h3 className="font-serif text-lg text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl text-cream">FAQs</h2>
        <div className="space-y-4">
          {SUPPORT_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
            >
              <summary className="cursor-pointer font-medium text-cream">{faq.question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-cream-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl text-cream">Email directory</h2>
        <div className="overflow-x-auto rounded-lg border border-gold-subtle">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-light">
                <th className="px-4 py-3 text-xs tracking-widest text-gold uppercase">Queue</th>
                <th className="px-4 py-3 text-xs tracking-widest text-gold uppercase">Email</th>
              </tr>
            </thead>
            <tbody>
              {SUPPORT_QUEUES.map((q) => (
                <tr key={q.slug} className="border-b border-gold-subtle last:border-0">
                  <td className="px-4 py-3 text-cream">{q.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${q.email}`} className="text-gold hover:text-gold-light">
                      {q.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function QueuePanel({ queue }: { queue: SupportQueue }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`[${queue.name}] Support request`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nQueue: ${queue.name}\n\n${message}`,
    );
    return `mailto:${queue.email}?subject=${subject}&body=${body}`;
  }, [queue, name, email, message]);

  return (
    <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <p className="text-xs tracking-widest text-gold uppercase">Selected queue</p>
      <h2 className="mt-1 font-serif text-2xl text-cream">{queue.name}</h2>
      <p className="mt-2 text-sm text-cream-muted">{queue.description}</p>
      <a
        href={`mailto:${queue.email}`}
        className="mt-4 inline-block font-serif text-xl text-gold hover:text-gold-light"
      >
        {queue.email}
      </a>
      {queue.url ? (
        <p className="mt-2 text-sm">
          <a
            href={queue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light"
          >
            {queue.domain} ↗
          </a>
        </p>
      ) : null}
      <ul className="mt-4 space-y-1">
        {queue.topics.map((topic) => (
          <li key={topic} className="flex gap-2 text-sm text-cream-muted">
            <span className="text-gold">◆</span>
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-gold-subtle pt-6">
        <h3 className="mb-4 font-serif text-lg text-cream">Contact form</h3>
        <p className="mb-4 text-xs text-cream-muted">
          Opens your email client addressed to the selected queue. No message is stored on HQ
          servers from this form.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField id="support-name" label="Name">
            <Input
              id="support-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField id="support-email" label="Email">
            <Input
              id="support-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
        </div>
        <div className="mt-3">
          <FormField id="support-message" label="Message">
            <Textarea
              id="support-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </FormField>
        </div>
        <a
          href={mailto}
          className="mt-4 inline-flex items-center justify-center rounded-sm border border-gold bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Send via email
        </a>
      </div>
    </section>
  );
}
