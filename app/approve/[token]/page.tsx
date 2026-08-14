import Link from "next/link";
import { verifyApprovalToken } from "@/lib/approve";
import { getPostByRow as getPostByRowMongo } from "@/lib/content/blog";
import { getPostByRow as getPostByRowSheet } from "@/lib/sheets";
import { ApprovalActions } from "@/components/admin/ApprovalActions";
import { BlogPostView } from "@/components/BlogPostView";

export const dynamic = "force-dynamic";

export default async function ApprovePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const parsed = verifyApprovalToken(token);

  if (!parsed) {
    return (
      <ResultShell
        title="Invalid approval link"
        message="This approval link is invalid or has been tampered with."
      />
    );
  }

  const post = (await getPostByRowMongo(parsed.row)) ?? (await getPostByRowSheet(parsed.row));

  if (!post) {
    return (
      <ResultShell
        title="Post not found"
        message="We couldn't find the post this link points to."
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h1 className="text-lg font-semibold tracking-tight text-white">Approve or reject this post</h1>
          <p className="mt-1 text-sm text-white/50">
            Review the post below, then decide. It stays private until you approve it.
          </p>
          <div className="mt-3 space-y-1 text-sm text-white/70">
            <p>
              <span className="font-medium text-white">Title:</span> {post.title}
            </p>
            {post.author && (
              <p>
                <span className="font-medium text-white">Submitted by:</span> {post.author}
              </p>
            )}
            <p>
              <span className="font-medium text-white">Submitted:</span> {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <ApprovalActions token={token} />
          </div>
        </div>

        <BlogPostView post={post} />
      </div>
    </div>
  );
}

function ResultShell({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-white/60">{message}</p>
        <Link href="/blog" className="mt-6 inline-block text-sm font-medium text-white underline underline-offset-4">
          ← Back to the blog
        </Link>
      </div>
    </div>
  );
}
