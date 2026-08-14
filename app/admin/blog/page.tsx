import Link from "next/link";
import { getAllPosts, type BlogPost } from "@/lib/content/blog";
import { deletePostAction } from "@/app/actions/blog";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/blogShared";

const SECTIONS: { key: BlogPost["status"]; label: string }[] = [
  { key: "pending", label: "Pending approval" },
  { key: "approved", label: "Published" },
  { key: "rejected", label: "Rejected" },
];

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog posts</h1>
          <p className="mt-1 text-sm text-white/50">
            New posts and edits stay private until approved via the emailed approval link.
          </p>
        </div>
        <Link href="/admin/blog/new" className={buttonClass}>
          New post
        </Link>
      </div>

      <div className="mt-8 space-y-10">
        {SECTIONS.map(({ key, label }) => {
          const items = posts.filter((p) => p.status === key);
          return (
            <div key={key}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/40">{label}</h2>
              {items.length === 0 ? (
                <p className="text-sm text-white/40">Nothing here.</p>
              ) : (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  {items.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                      {post.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImageUrl} alt="" className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-white/10" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{post.title}</p>
                        <p className="truncate text-xs text-white/40">
                          {post.author || "—"} · {formatDate(post.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {post.status === "approved" && (
                          <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs font-medium text-white/60 hover:text-white">
                            View
                          </Link>
                        )}
                        <Link href={`/admin/blog/edit/${post.id}`} className="text-xs font-medium text-accent-blue hover:underline">
                          Edit
                        </Link>
                        <DeleteButton action={deletePostAction.bind(null, post.row)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
