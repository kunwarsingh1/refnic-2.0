"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { NewsletterPost } from "@/lib/content/newsletter";
import { NEWSLETTER_GRADIENTS } from "@/lib/newsletterGradients";

export function NewsletterPostForm({
  post,
  action,
}: {
  post?: NewsletterPost;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

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
          Category
        </label>
        <input id="category" name="category" type="text" required defaultValue={post?.category} className={inputClass} />
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={post?.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Excerpt
        </label>
        <textarea id="excerpt" name="excerpt" required rows={3} defaultValue={post?.excerpt} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
