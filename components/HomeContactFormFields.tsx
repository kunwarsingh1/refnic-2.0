"use client";

import { useState, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/contact";
import { GradientCtaButton } from "@/components/ui/primitives";

function Field({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[16px] font-medium leading-[20px] text-white">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-3 w-full border-b border-white/25 bg-transparent pb-2 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#3152DF]"
      />
    </label>
  );
}

export default function HomeContactFormFields({ subjects }: { subjects: string[] }) {
  const [subject, setSubject] = useState(subjects[0]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await submitEnquiry({
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject,
      message: String(data.get("message") ?? ""),
    });

    setSubmitting(false);
    setResult(res);
    if (res.ok) {
      form.reset();
      setSubject(subjects[0]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="First Name" name="firstName" />
        <Field label="Last Name" name="lastName" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" />
        <Field label="Phone Number" name="phone" defaultValue="+91" />
      </div>

      <div>
        <span className="text-[16px] font-semibold leading-[20px] text-white">Select Subject?</span>
        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
          {subjects.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-[15px] text-white/90">
              <input
                type="radio"
                name="subject"
                checked={subject === s}
                onChange={() => setSubject(s)}
                className="h-[13px] w-[13px] shrink-0 appearance-none rounded-[2px] border border-white/50 bg-transparent checked:border-[#3152DF] checked:bg-[#3152DF]"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-[16px] font-semibold leading-[20px] text-white">Message</span>
        <textarea
          name="message"
          placeholder="Write your message.."
          rows={3}
          className="mt-3 w-full resize-none border-b border-white/25 bg-transparent pb-2 text-[13px] text-white placeholder:text-white/70 outline-none transition-colors focus:border-[#3152DF]"
        />
      </label>

      {result && (
        <p className={`text-sm ${result.ok ? "text-green-400" : "text-red-400"}`}>
          {result.ok ? "Thanks — your enquiry has been sent. We'll be in touch soon." : result.error}
        </p>
      )}

      <div className="flex justify-end">
        <GradientCtaButton type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit Enquiry"}
        </GradientCtaButton>
      </div>
    </form>
  );
}
