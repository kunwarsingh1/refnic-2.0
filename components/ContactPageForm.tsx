"use client";

import { useState, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/contact";
import { GradientCtaButton, CmsImagePlaceholder } from "@/components/ui/primitives";

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path
        d="M5 4h3l2 5-2 1.5a12 12 0 005.5 5.5L17 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

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

export default function ContactPageForm({
  email = "Something@gmail.com",
  phone = "+91 9999999999",
  address,
  contactInfoHeading,
  imageUrl,
  subjects,
}: {
  email?: string;
  phone?: string;
  address: string;
  contactInfoHeading: string;
  imageUrl?: string;
  subjects: string[];
}) {
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
    <section id="contact-form" className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="relative">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="pointer-events-none absolute -top-24 -left-6 hidden h-[300px] w-[360px] rounded-lg object-cover md:block"
            />
          ) : (
            <CmsImagePlaceholder className="pointer-events-none absolute -top-24 -left-6 hidden h-[300px] w-[360px] rounded-lg md:block" />
          )}

          <div
            className="pointer-events-none absolute inset-0 border-2 bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
            style={{ borderImage: "linear-gradient(to bottom left, #1f1313, #737373, #191717) 1" }}
            aria-hidden
          />

          <div className="relative grid gap-12 p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:p-14">
            <div>
              <h2 className="whitespace-pre-line font-sans text-2xl font-bold leading-tight text-white md:text-3xl">
                {contactInfoHeading}
              </h2>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="mt-1 h-6 w-6 shrink-0 text-white" />
                  <p className="text-[20px] text-white">{email}</p>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="mt-1 h-6 w-6 shrink-0 text-white" />
                  <p className="text-[20px] text-white">{phone}</p>
                </div>

                <div className="flex items-start gap-3">
                  <LocationIcon className="mt-1 h-6 w-6 shrink-0 text-white" />
                  <p className="max-w-xs whitespace-pre-line text-[15.3px] font-semibold leading-relaxed text-white">
                    {address}
                  </p>
                </div>
              </div>
            </div>

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
                  {result.ok
                    ? "Thanks — your enquiry has been sent. We'll be in touch soon."
                    : result.error}
                </p>
              )}

              <div className="flex justify-end">
                <GradientCtaButton type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Enquiry"}
                </GradientCtaButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
