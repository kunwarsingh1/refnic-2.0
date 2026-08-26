"use client";

import { useState } from "react";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";
import type { FooterConfig, FooterLink } from "@/lib/content/footer";

function LinkListEditor({
  links,
  onChange,
  labelName,
  hrefName,
}: {
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
  labelName: string;
  hrefName: string;
}) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input
            name={labelName}
            type="text"
            placeholder="Label"
            defaultValue={link.label}
            className={`${inputClass} flex-1`}
          />
          <input
            name={hrefName}
            type="text"
            placeholder="URL"
            defaultValue={link.href}
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={() => onChange(links.filter((_, idx) => idx !== i))}
            className="text-xs font-medium text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", href: "#" }])}
        className="text-sm font-medium text-accent-blue hover:underline"
      >
        + Add link
      </button>
    </div>
  );
}

export function FooterConfigForm({
  config,
  action,
}: {
  config: FooterConfig;
  action: (formData: FormData) => Promise<void>;
}) {
  const [columns, setColumns] = useState(config.linkColumns);
  const [bottomLinks, setBottomLinks] = useState(config.bottomLinks);

  return (
    <form action={action} className="max-w-2xl space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="brandName" className={labelClass}>
            Brand name
          </label>
          <input id="brandName" name="brandName" type="text" defaultValue={config.brandName} className={inputClass} />
        </div>
        <div>
          <label htmlFor="watermarkText" className={labelClass}>
            Watermark text <span className="text-white/40">(large background text)</span>
          </label>
          <input
            id="watermarkText"
            name="watermarkText"
            type="text"
            defaultValue={config.watermarkText}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="tagline" className={labelClass}>
          Tagline
        </label>
        <textarea id="tagline" name="tagline" rows={3} defaultValue={config.tagline} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="linkedin" className={labelClass}>
            LinkedIn URL
          </label>
          <input id="linkedin" name="linkedin" type="text" defaultValue={config.social.linkedin} className={inputClass} />
        </div>
        <div>
          <label htmlFor="youtube" className={labelClass}>
            YouTube URL
          </label>
          <input id="youtube" name="youtube" type="text" defaultValue={config.social.youtube} className={inputClass} />
        </div>
        <div>
          <label htmlFor="socialEmail" className={labelClass}>
            Email link
          </label>
          <input
            id="socialEmail"
            name="socialEmail"
            type="text"
            defaultValue={config.social.email}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactHeading" className={labelClass}>
          Contact section heading
        </label>
        <input
          id="contactHeading"
          name="contactHeading"
          type="text"
          defaultValue={config.contactHeading}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="contactEmail" className={labelClass}>
            Contact email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="text"
            defaultValue={config.contactEmail}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contactPhone" className={labelClass}>
            Contact phone
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="text"
            defaultValue={config.contactPhone}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="copyrightName" className={labelClass}>
            Copyright name
          </label>
          <input
            id="copyrightName"
            name="copyrightName"
            type="text"
            defaultValue={config.copyrightName}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactAddress" className={labelClass}>
          Contact address
        </label>
        <textarea
          id="contactAddress"
          name="contactAddress"
          rows={2}
          defaultValue={config.contactAddress}
          className={inputClass}
        />
      </div>

      <div className="space-y-6">
        <p className={labelClass}>Link columns</p>
        {columns.map((col, ci) => (
          <div key={ci} className="rounded-md border border-white/10 p-4">
            <input type="hidden" name="columnTitle" value={col.title} />
            <input
              type="text"
              defaultValue={col.title}
              onChange={(e) =>
                setColumns((cs) => cs.map((c, idx) => (idx === ci ? { ...c, title: e.target.value } : c)))
              }
              className={`${inputClass} mb-3 font-bold`}
            />
            <LinkListEditor
              links={col.links}
              onChange={(links) => setColumns((cs) => cs.map((c, idx) => (idx === ci ? { ...c, links } : c)))}
              labelName={`columnLinkLabel-${ci}`}
              hrefName={`columnLinkHref-${ci}`}
            />
          </div>
        ))}
      </div>

      <div>
        <p className={labelClass}>Bottom bar links</p>
        <LinkListEditor
          links={bottomLinks}
          onChange={setBottomLinks}
          labelName="bottomLinkLabel"
          hrefName="bottomLinkHref"
        />
      </div>

      <button type="submit" className={buttonClass}>
        Save
      </button>
    </form>
  );
}
