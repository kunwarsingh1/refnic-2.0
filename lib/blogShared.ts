export const BUCKETS = {
  images: { prefix: "images", maxSize: 20 * 1024 * 1024, kind: "image" as const },
  videos: { prefix: "videos", maxSize: 200 * 1024 * 1024, kind: "video" as const },
  pdfs: { prefix: "pdfs", maxSize: 50 * 1024 * 1024, kind: "pdf" as const },
  models: { prefix: "models", maxSize: 50 * 1024 * 1024, kind: "model" as const },
} as const;

export type BucketName = keyof typeof BUCKETS;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  let id: string | null = null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (parsed.hostname.endsWith("youtube.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.replace("/embed/", "");
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.replace("/shorts/", "");
      }
    }
  } catch {
    return null;
  }

  id = id?.split(/[?&]/)[0] ?? null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
