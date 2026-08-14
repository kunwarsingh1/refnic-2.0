import type { BucketName } from "@/lib/blogShared";

export async function uploadFile(
  bucket: BucketName,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  const form = new FormData();
  form.set("file", file);
  form.set("bucket", bucket);

  try {
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) return { url: null, error: data.error ?? "Upload failed." };
    return { url: data.url ?? null, error: null };
  } catch {
    return { url: null, error: "Upload failed. Please try again." };
  }
}

export async function uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
  return uploadFile("images", file);
}
