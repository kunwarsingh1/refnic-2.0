"use client";

import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";
import type { NavbarConfig } from "@/lib/content/navbar";

function LinkRows({ links, labelName, hrefName }: { links: { label: string; href: string }[]; labelName: string; hrefName: string }) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input name={labelName} type="text" defaultValue={link.label} placeholder="Label" className={`${inputClass} flex-[2]`} />
          <input name={hrefName} type="text" defaultValue={link.href} placeholder="URL" className={`${inputClass} flex-1`} />
        </div>
      ))}
    </div>
  );
}

export function NavbarConfigForm({
  config,
  action,
}: {
  config: NavbarConfig;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactEmail" className={labelClass}>
            Contact email
          </label>
          <input id="contactEmail" name="contactEmail" type="text" defaultValue={config.contactEmail} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contactPhone" className={labelClass}>
            Contact phone
          </label>
          <input id="contactPhone" name="contactPhone" type="text" defaultValue={config.contactPhone} className={inputClass} />
        </div>
      </div>

      <div>
        <p className={labelClass}>About Us dropdown</p>
        <p className="mb-3 text-xs text-white/40">Fixed 5 items — title, subtitle and link are editable.</p>
        <div className="space-y-3">
          {config.aboutMenu.map((item, i) => (
            <div key={i} className="rounded-md border border-white/10 p-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="aboutTitle"
                  type="text"
                  defaultValue={item.title}
                  placeholder="Title"
                  className={inputClass}
                />
                <input
                  name="aboutHref"
                  type="text"
                  defaultValue={item.href}
                  placeholder="URL"
                  className={inputClass}
                />
              </div>
              <input
                name="aboutSubtitle"
                type="text"
                defaultValue={item.subtitle}
                placeholder="Subtitle"
                className={`${inputClass} mt-2`}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className={labelClass}>Products dropdown</p>
        <p className="mb-3 text-xs text-white/40">Fixed {config.productsMenu.length} items — labels and links are editable.</p>
        <LinkRows links={config.productsMenu} labelName="productsLabel" hrefName="productsHref" />
      </div>

      <div>
        <p className={labelClass}>Technologies dropdown</p>
        <p className="mb-3 text-xs text-white/40">Fixed {config.technologiesMenu.length} items — labels and links are editable.</p>
        <LinkRows links={config.technologiesMenu} labelName="techLabel" hrefName="techHref" />
      </div>

      <button type="submit" className={buttonClass}>
        Save
      </button>
    </form>
  );
}
