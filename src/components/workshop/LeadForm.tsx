"use client";

import { useState, type FormEvent } from "react";
import { workshop } from "@/config/workshop";

type Status = "idle" | "sending" | "error" | "success";

const emptyValues = { name: "", phone: "", email: "", message: "", company: "" };

export default function LeadForm() {
  const { form, contact } = workshop;
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const update =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === "error" || status === "success") setStatus("idle");
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
        setStatus("success");
        setValues(emptyValues);
      } catch {
        setErrorText("לא הצלחנו לשלוח כרגע — נסו שוב, או דברו איתנו בוואטסאפ.");
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
    setStatus("success");
    setValues(emptyValues);
  };

  const sending = status === "sending";

  return (
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
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === "error" ? "text-accent" : "text-muted"}`}
        >
          {status === "error" && errorText}
          {status === "success" && form.success}
        </p>
      </div>
    </form>
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
