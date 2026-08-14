import { notFound } from "next/navigation";
import { getPostById } from "@/lib/content/blog";
import { PostEditor } from "@/components/admin/PostEditor";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit post</h1>
      <div className="mt-6">
        <PostEditor initial={post} />
      </div>
    </div>
  );
}
