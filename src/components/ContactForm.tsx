"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "hello@taliabaruchyan.com";

const socials = [
  { label: "Vimeo", href: "https://vimeo.com", handle: "vimeo.com/talia" },
  { label: "IMDb", href: "https://www.imdb.com", handle: "imdb · Talia Baruchyan" },
  { label: "Instagram", href: "https://instagram.com", handle: "@talia.films" },
];

type Status = "idle" | "error" | "success";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== "idle") setStatus("idle");
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !validEmail || !form.message.trim()) {
      setStatus("error");
      return;
    }
    // TODO: wire up to a real email service / API route.
    // For now the submission is simulated on the client.
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro + direct links */}
          <div className="lg:col-span-5">
            <p className="eyebrow">צור קשר</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              בואו נעשה סרט.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              מתעניינים בשיתוף פעולה, בהקרנה או סתם רוצים להגיד שלום? אשמח לשמוע.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="link-underline mt-8 inline-block font-display text-xl font-bold text-ink sm:text-2xl"
              dir="ltr"
            >
              {EMAIL}
            </a>

            <ul className="mt-10 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-line py-3 transition-colors hover:border-ink/40"
                  >
                    <span className="font-display text-base font-semibold text-ink transition-colors group-hover:text-accent">
                      {s.label}
                    </span>
                    <span className="flex items-center gap-3 text-xs text-muted" dir="ltr">
                      {s.handle}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-out-expo group-hover:-translate-x-1"
                      >
                        ↖
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  id="name"
                  label="שם מלא"
                  value={form.name}
                  onChange={update("name")}
                  autoComplete="name"
                  placeholder="השם שלך"
                />
                <Field
                  id="email"
                  label="אימייל"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  autoComplete="email"
                  placeholder="you@email.com"
                  dir="ltr"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="ספרו לי על הפרויקט…"
                  className="w-full resize-y rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/40 focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
                >
                  שליחת הודעה
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${
                    status === "error"
                      ? "text-accent"
                      : status === "success"
                        ? "text-ink"
                        : "text-muted"
                  }`}
                >
                  {status === "error" &&
                    "נא למלא שם, אימייל תקין והודעה."}
                  {status === "success" &&
                    "תודה! ההודעה נשלחה. אחזור אליכם בהקדם."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  dir,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        dir={dir}
        className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/40 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
