import { PostEditor } from "@/components/admin/PostEditor";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">New post</h1>
      <div className="mt-6">
        <PostEditor />
      </div>
    </div>
  );
}
