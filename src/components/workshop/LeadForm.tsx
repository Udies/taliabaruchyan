"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { workshop } from "@/config/workshop";

type Status = "idle" | "sending" | "error" | "success";

const emptyValues = { name: "", phone: "", email: "", message: "", company: "" };

export default function LeadForm() {
  const { form, contact } = workshop;
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Modal behaviour: lock scroll, close on Escape, focus the close button.
  useEffect(() => {
    if (!successOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSuccessOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [successOpen]);

  const update =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: real people leave this empty; bots tend to fill it.
    if (values.company.trim() !== "") return;

    const hasContact =
      values.phone.trim() !== "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!values.name.trim() || !hasContact) {
      setErrorText("נא למלא שם וגם טלפון או מייל.");
      setStatus("error");
      return;
    }

    const fields = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    const succeed = () => {
      setStatus("success");
      setValues(emptyValues);
      setSuccessOpen(true);
    };

    // Preferred path: save the lead to the Google Sheet (and email Talia).
    if (contact.leadEndpoint) {
      setStatus("sending");
      try {
        await fetch(contact.leadEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(fields).toString(),
        });
        succeed();
      } catch {
        setErrorText("לא הצלחנו לשלוח כרגע. נסו שוב, או דברו איתנו בוואטסאפ.");
        setStatus("error");
      }
      return;
    }

    // Fallback until the Sheet endpoint is wired: open WhatsApp / email.
    const body = [
      "פנייה חדשה לסדנת וידאותרפיה",
      `שם: ${fields.name}`,
      fields.phone && `טלפון: ${fields.phone}`,
      fields.email && `מייל: ${fields.email}`,
      fields.message && `רוצה לדעת: ${fields.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (contact.whatsapp) {
      window.open(
        `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else if (contact.email) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        "פנייה לסדנת וידאותרפיה",
      )}&body=${encodeURIComponent(body)}`;
    }
    succeed();
  };

  const sending = status === "sending";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
      >
        {/* Honeypot (hidden from people) */}
        <div aria-hidden className="absolute h-0 w-0 overflow-hidden" style={{ opacity: 0 }}>
          <label htmlFor="company">אל תמלאו שדה זה</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={update("company")}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="שם מלא"
            value={values.name}
            onChange={update("name")}
            autoComplete="name"
            placeholder="השם שלך"
          />
          <Field
            id="phone"
            label="טלפון"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
            placeholder="050-0000000"
            dir="ltr"
          />
        </div>

        <div className="mt-5">
          <Field
            id="email"
            label="כתובת מייל"
            type="email"
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
            placeholder="you@email.com"
            dir="ltr"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
            מה היית רוצה לדעת?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={update("message")}
            placeholder="כתבו לי כל שאלה…"
            className="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "שולח…" : form.submit}
          </button>
          {status === "error" && (
            <p role="status" aria-live="polite" className="text-sm text-accent">
              {errorText}
            </p>
          )}
        </div>
      </form>

      {/* Thank-you pop-up */}
      {successOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-success-title"
        >
          <button
            type="button"
            aria-label="סגירה"
            onClick={() => setSuccessOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-line bg-surface p-8 text-center shadow-2xl">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setSuccessOpen(false)}
              aria-label="סגירה"
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>

            <h3 id="lead-success-title" className="mt-5 font-serif text-3xl font-bold text-ink">
              תודה!
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{form.success}</p>

            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.52 11.86c-.25.12-1.47.72-1.69.81-.23.08-.39.12-.56-.12-.17-.25-.64-.81-.79-.97-.14-.17-.29-.19-.54-.06-.25.12-1.05.39-1.99 1.23-.74.66-1.23 1.47-1.38 1.72-.14.25-.02.38.11.5.11.11.25.29.37.43.12.14.17.25.25.41.08.17.04.31-.02.43-.06.12-.56 1.34-.76 1.84-.2.48-.41.42-.56.43l-.48.01c-.17 0-.43-.06-.66-.31-.23-.25-.86-.85-.86-2.07 0-1.22.89-2.4 1.01-2.56.12-.17 1.75-2.67 4.23-3.74.59-.26 1.05-.41 1.41-.52.59-.19 1.13-.16 1.56-.1.48.07 1.47.6 1.67 1.18.21.58.21 1.07.14 1.18-.06.11-.22.17-.47.29z" />
                </svg>
                רוצים לכתוב עכשיו? וואטסאפ
              </a>
            )}

            <div>
              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                className="link-underline mt-5 text-sm font-semibold text-muted hover:text-ink"
              >
                סגירה
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
