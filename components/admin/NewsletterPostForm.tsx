"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { NewsletterContentField } from "@/components/admin/NewsletterContentField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import type { NewsletterPost } from "@/lib/content/newsletter";
import type { NewsletterTab } from "@/lib/content/newsletterTabs";
import { NEWSLETTER_GRADIENTS } from "@/lib/newsletterGradients";

export function NewsletterPostForm({
  post,
  tabs,
  action,
}: {
  post?: NewsletterPost;
  tabs: NewsletterTab[];
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const tabNames = tabs.map((t) => t.name);
  const options = post?.category && !tabNames.includes(post.category) ? [post.category, ...tabNames] : tabNames;

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/newsletter");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="category" className={labelClass}>
          Category / Tab
        </label>
        {options.length > 0 ? (
          <select id="category" name="category" required defaultValue={post?.category} className={inputClass}>
            {!post?.category && <option value="">Select a tab…</option>}
            {options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input id="category" name="category" type="text" required defaultValue={post?.category} className={inputClass} />
            <p className="mt-1 text-xs text-white/40">
              No newsletter tabs yet —{" "}
              <a href="/admin/newsletter-tabs/new" className="text-accent-blue hover:underline">
                create one first
              </a>{" "}
              so it appears here as a dropdown option.
            </p>
          </>
        )}
      </div>

      <LineBreakField name="title" label="Title" defaultValue={post?.title} required />

      <LineBreakField name="excerpt" label="Excerpt" defaultValue={post?.excerpt} rows={3} required />

      <ImageUploadField name="imageUrl" label="Featured image" defaultValue={post?.imageUrl} />

      <NewsletterContentField name="content" defaultValue={post?.content} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className={labelClass}>
            Author
          </label>
          <input id="author" name="author" type="text" required defaultValue={post?.author} className={inputClass} />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input id="date" name="date" type="date" defaultValue={post?.date ?? today} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="meta" className={labelClass}>
          Meta line <span className="text-white/40">(e.g. "Sept 28, 2020 - 6 mins read")</span>
        </label>
        <input id="meta" name="meta" type="text" required defaultValue={post?.meta} className={inputClass} />
      </div>

      <div>
        <label htmlFor="gradient" className={labelClass}>
          Card gradient
        </label>
        <select id="gradient" name="gradient" defaultValue={post?.gradient ?? NEWSLETTER_GRADIENTS[0]} className={inputClass}>
          {NEWSLETTER_GRADIENTS.map((g, i) => (
            <option key={g} value={g}>
              Gradient {i + 1}
            </option>
          ))}
        </select>
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} className="h-4 w-4 accent-accent-blue" />
        Make this the featured (hero) post for its tab — shown bigger, other posts in the tab shown smaller
      </label>

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/newsletter")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
