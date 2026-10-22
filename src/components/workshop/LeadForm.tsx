"use client";

import { useState, type FormEvent } from "react";
import { workshop } from "@/config/workshop";

type Status = "idle" | "error" | "success";

export default function LeadForm() {
  const { form, contact } = workshop;
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== "idle") setStatus("idle");
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasContact =
      values.phone.trim() !== "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!values.name.trim() || !hasContact) {
      setStatus("error");
      return;
    }

    // Compose the lead. When Talia's WhatsApp/email is configured, open it so
    // the lead reaches her directly; otherwise just confirm on-screen.
    const lines = [
      "פנייה חדשה לסדנת וידאותרפיה",
      `שם: ${values.name}`,
      values.phone && `טלפון: ${values.phone}`,
      values.email && `מייל: ${values.email}`,
      values.message && `רוצה לדעת: ${values.message}`,
    ].filter(Boolean);
    const body = lines.join("\n");

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
    setValues({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
    >
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
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          {form.submit}
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
          {status === "error" && "נא למלא שם וגם טלפון או מייל."}
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
