"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AlignLeft,
  ArrowDown,
  ArrowUp,
  Clapperboard,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Link2,
  Loader2,
  Replace,
  Trash2,
  CirclePlay,
} from "lucide-react";
import { publishPost, updatePostAction } from "@/app/actions/blog";
import { uploadFile } from "@/lib/upload";
import type { BucketName } from "@/lib/blogShared";
import { getYoutubeEmbedUrl } from "@/lib/blogShared";
import type {
  Block,
  TextBlock,
  ImageBlock,
  VideoBlock,
  YoutubeBlock,
  PdfBlock,
  LinkBlock,
  BlogPost,
} from "@/lib/content/blog";
import { PdfEmbed } from "@/components/admin/PdfEmbed";
import { inputClass, buttonClass } from "@/components/admin/formStyles";

const btnClass =
  "inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-50";

function FileButton({
  accept,
  uploading,
  onUpload,
  children,
  className = btnClass,
}: {
  accept: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  children: ReactNode;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className={className}>
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

function UploadArea({
  accept,
  uploading,
  onUpload,
  label,
  hint,
  icon,
}: {
  accept: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  label: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <FileButton
        accept={accept}
        uploading={uploading}
        onUpload={onUpload}
        className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-white/20 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:opacity-50"
      >
        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
        {uploading ? "Uploading…" : label}
      </FileButton>
      <p className="text-xs text-white/30">{hint}</p>
    </div>
  );
}

function LinkOption({
  url,
  onUrlChange,
  placeholder,
  visible,
  setVisible,
}: {
  url: string;
  onUrlChange: (value: string) => void;
  placeholder: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  if (!visible) {
    return (
      <button type="button" onClick={() => setVisible(true)} className="text-xs text-white/40 underline underline-offset-2 hover:text-white">
        …or paste a link instead
      </button>
    );
  }
  return (
    <div className="flex w-full flex-col gap-1.5">
      <input value={url} onChange={(e) => onUrlChange(e.target.value)} placeholder={placeholder} className={inputClass} />
      <button type="button" onClick={() => setVisible(false)} className="self-start text-xs text-white/40 hover:text-white">
        Cancel link
      </button>
    </div>
  );
}

const blockNames: Record<Block["type"], string> = {
  text: "Paragraph",
  image: "Photo",
  video: "Video",
  youtube: "YouTube video",
  pdf: "Document",
  link: "Link",
};

function BlockHeader({
  name,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  name: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wide text-white/40">{name}</span>
      <div className="flex items-center gap-1">
        <button type="button" onClick={onMoveUp} title="Move up" className="rounded p-1.5 text-white/50 hover:bg-white/10">
          <ArrowUp className="h-4 w-4" />
        </button>
        <button type="button" onClick={onMoveDown} title="Move down" className="rounded p-1.5 text-white/50 hover:bg-white/10">
          <ArrowDown className="h-4 w-4" />
        </button>
        <button type="button" onClick={onRemove} title="Remove" className="rounded p-1.5 text-white/50 hover:bg-red-500/10 hover:text-red-400">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TextBlockEditor({ block, onUpdate }: { block: TextBlock; onUpdate: (patch: Partial<TextBlock>) => void }) {
  return (
    <textarea
      value={block.text}
      onChange={(e) => onUpdate({ text: e.target.value })}
      placeholder="Write your text here…"
      rows={Math.max(2, Math.min(12, block.text.split("\n").length + 1))}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  );
}

function ImageBlockEditor({
  block,
  uploading,
  onUpdate,
  onUpload,
}: {
  block: ImageBlock;
  uploading: boolean;
  onUpdate: (patch: Partial<ImageBlock>) => void;
  onUpload: (file: File) => void;
}) {
  const [showLink, setShowLink] = useState(false);

  return (
    <div>
      {block.url ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt="" className="w-full rounded-lg bg-white/[0.03] object-contain" />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <FileButton accept="image/*" uploading={uploading} onUpload={onUpload}>
              <Replace className="h-4 w-4" />
              Change picture
            </FileButton>
            <button type="button" onClick={() => onUpdate({ url: "" })} className={btnClass}>
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <UploadArea
            accept="image/*"
            uploading={uploading}
            onUpload={onUpload}
            label="Choose a picture"
            hint="JPG, PNG or GIF — we'll host it for you."
            icon={<ImagePlus className="h-5 w-5" />}
          />
          <LinkOption
            url={block.url}
            onUrlChange={(value) => onUpdate({ url: value })}
            placeholder="Paste the picture link (https://…)"
            visible={showLink}
            setVisible={setShowLink}
          />
        </div>
      )}
      <input
        value={block.caption ?? ""}
        onChange={(e) => onUpdate({ caption: e.target.value })}
        placeholder="Add a short caption (optional)"
        className={`${inputClass} mt-3`}
      />
    </div>
  );
}

function VideoBlockEditor({
  block,
  uploading,
  onUpdate,
  onUpload,
}: {
  block: VideoBlock;
  uploading: boolean;
  onUpdate: (patch: Partial<VideoBlock>) => void;
  onUpload: (file: File) => void;
}) {
  const [showLink, setShowLink] = useState(false);

  return (
    <div>
      {block.url ? (
        <div>
          <video src={block.url} controls preload="metadata" className="w-full rounded-lg bg-black" />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <FileButton accept="video/*" uploading={uploading} onUpload={onUpload}>
              <Replace className="h-4 w-4" />
              Change video
            </FileButton>
            <button type="button" onClick={() => onUpdate({ url: "" })} className={btnClass}>
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <UploadArea
            accept="video/*"
            uploading={uploading}
            onUpload={onUpload}
            label="Choose a video"
            hint="MP4 or WebM — we'll host it for you."
            icon={<Clapperboard className="h-5 w-5" />}
          />
          <LinkOption
            url={block.url}
            onUrlChange={(value) => onUpdate({ url: value })}
            placeholder="Paste the video link (https://…)"
            visible={showLink}
            setVisible={setShowLink}
          />
        </div>
      )}
      <input
        value={block.caption ?? ""}
        onChange={(e) => onUpdate({ caption: e.target.value })}
        placeholder="Add a short caption (optional)"
        className={`${inputClass} mt-3`}
      />
    </div>
  );
}

function YoutubeBlockEditor({ block, onUpdate }: { block: YoutubeBlock; onUpdate: (patch: Partial<YoutubeBlock>) => void }) {
  const embedUrl = getYoutubeEmbedUrl(block.url);

  return (
    <div>
      <input
        value={block.url}
        onChange={(e) => onUpdate({ url: e.target.value })}
        placeholder="Paste a YouTube link (https://www.youtube.com/watch?v=…)"
        className={inputClass}
      />
      {embedUrl ? (
        <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            src={embedUrl}
            title={block.caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : block.url ? (
        <p className="mt-2 text-xs text-white/30">Paste a YouTube link to preview it here.</p>
      ) : null}
      <input
        value={block.caption ?? ""}
        onChange={(e) => onUpdate({ caption: e.target.value })}
        placeholder="Add a short caption (optional)"
        className={`${inputClass} mt-3`}
      />
    </div>
  );
}

function PdfBlockEditor({
  block,
  uploading,
  onUpdate,
  onUpload,
}: {
  block: PdfBlock;
  uploading: boolean;
  onUpdate: (patch: Partial<PdfBlock>) => void;
  onUpload: (file: File) => void;
}) {
  const [showLink, setShowLink] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <div>
      {block.url ? (
        <div className="rounded-lg border border-white/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-medium text-white/80">
              <FileText className="h-4 w-4 text-white/50" />
              Document attached
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setPreview((v) => !v)} className={btnClass}>
                {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {preview ? "Hide preview" : "Preview"}
              </button>
              <FileButton accept="application/pdf" uploading={uploading} onUpload={onUpload}>
                <Replace className="h-4 w-4" />
                Change
              </FileButton>
              <button type="button" onClick={() => onUpdate({ url: "" })} className={btnClass}>
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
          {preview && <PdfEmbed url={block.url} />}
        </div>
      ) : (
        <div className="space-y-3">
          <UploadArea
            accept="application/pdf"
            uploading={uploading}
            onUpload={onUpload}
            label="Choose a document (PDF)"
            hint="It will appear right inside your post — no download needed."
            icon={<FileText className="h-5 w-5" />}
          />
          <LinkOption
            url={block.url}
            onUrlChange={(value) => onUpdate({ url: value })}
            placeholder="Paste the document link (https://…)"
            visible={showLink}
            setVisible={setShowLink}
          />
        </div>
      )}
      <input
        value={block.label ?? ""}
        onChange={(e) => onUpdate({ label: e.target.value })}
        placeholder="Name of the document (optional)"
        className={`${inputClass} mt-3`}
      />
      <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          checked={block.downloadable ?? false}
          onChange={(e) => onUpdate({ downloadable: e.target.checked })}
          className="h-4 w-4 accent-accent-blue"
        />
        Make this PDF downloadable (asks readers for their email once)
      </label>
      {block.downloadable && (
        <p className="mt-2 text-xs text-white/30">
          On the blog, this document is replaced by a download button that collects one email before unlocking the file.
        </p>
      )}
    </div>
  );
}

function LinkBlockEditor({ block, onUpdate }: { block: LinkBlock; onUpdate: (patch: Partial<LinkBlock>) => void }) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor={`label-${block.id}`} className="text-xs font-medium text-white/40">
          Name of the link
        </label>
        <input
          id={`label-${block.id}`}
          value={block.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="e.g. Read the full report"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={`url-${block.id}`} className="text-xs font-medium text-white/40">
          Link address
        </label>
        <input
          id={`url-${block.id}`}
          value={block.url}
          onChange={(e) => onUpdate({ url: e.target.value })}
          placeholder="https://example.com"
          className={inputClass}
        />
      </div>
    </div>
  );
}

function blockBucket(block: Block): BucketName {
  switch (block.type) {
    case "image":
      return "images";
    case "video":
      return "videos";
    case "pdf":
      return "pdfs";
    default:
      return "images";
  }
}

function insertBreak(
  el: HTMLTextAreaElement | null,
  value: string,
  setValue: (v: string) => void,
) {
  if (!el) return;
  const start = el.selectionStart ?? value.length;
  const end = el.selectionEnd ?? value.length;
  setValue(value.slice(0, start) + "\n" + value.slice(end));
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(start + 1, start + 1);
  });
}

export function PostEditor({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  const [coverImage, setCoverImage] = useState(initial?.coverImageUrl ?? "");
  const [blocks, setBlocks] = useState<Block[]>(initial?.content ?? []);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addBlock(type: Block["type"]) {
    const id = crypto.randomUUID();
    let block: Block;
    switch (type) {
      case "text":
        block = { id, type: "text", text: "" };
        break;
      case "image":
        block = { id, type: "image", url: "" };
        break;
      case "video":
        block = { id, type: "video", url: "" };
        break;
      case "youtube":
        block = { id, type: "youtube", url: "" };
        break;
      case "pdf":
        block = { id, type: "pdf", url: "" };
        break;
      case "link":
        block = { id, type: "link", url: "", label: "" };
        break;
    }
    setBlocks((prev) => [...prev, block]);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function updateBlock(id: string, patch: Partial<Block>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const i = prev.findIndex((b) => b.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function handleUpload(bucket: BucketName, file: File, id: string) {
    setUploadingKey(id);
    setError(null);
    const { url, error } = await uploadFile(bucket, file);
    if (error) {
      setError(error);
    } else if (url) {
      updateBlock(id, { url } as Partial<Block>);
    }
    setUploadingKey(null);
  }

  async function handleCoverUpload(file: File) {
    setUploadingKey("cover");
    setError(null);
    const { url, error } = await uploadFile("images", file);
    if (error) {
      setError(error);
    } else if (url) {
      setCoverImage(url);
    }
    setUploadingKey(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const res = initial
      ? await updatePostAction(
          { title, excerpt, coverImage, content: blocks, published: false },
          initial.row,
        )
      : await publishPost({ title, excerpt, coverImage, content: blocks, published: false });
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Could not save the post.");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  const blockEditor = (block: Block) => {
    const uploading = uploadingKey === block.id;
    const onUpload = (file: File) => handleUpload(blockBucket(block), file, block.id);
    switch (block.type) {
      case "text":
        return <TextBlockEditor block={block} onUpdate={(p) => updateBlock(block.id, p)} />;
      case "image":
        return <ImageBlockEditor block={block} uploading={uploading} onUpdate={(p) => updateBlock(block.id, p)} onUpload={onUpload} />;
      case "video":
        return <VideoBlockEditor block={block} uploading={uploading} onUpdate={(p) => updateBlock(block.id, p)} onUpload={onUpload} />;
      case "youtube":
        return <YoutubeBlockEditor block={block} onUpdate={(p) => updateBlock(block.id, p)} />;
      case "pdf":
        return <PdfBlockEditor block={block} uploading={uploading} onUpdate={(p) => updateBlock(block.id, p)} onUpload={onUpload} />;
      case "link":
        return <LinkBlockEditor block={block} onUpdate={(p) => updateBlock(block.id, p)} />;
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <p className="text-sm text-white/50">
        Write your post below. Add photos, videos, documents and links — they&apos;ll appear one after another, exactly like
        your readers will see them.
      </p>

      <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col gap-1">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => insertBreak(titleRef.current, title, setTitle)}
              className="text-xs font-medium text-accent-blue hover:underline"
            >
              + Add line break
            </button>
          </div>
          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title…"
            rows={1}
            className="w-full resize-none border-0 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-white/25"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="excerpt" className="text-xs font-medium text-white/40">
              Short summary (optional)
            </label>
            <button
              type="button"
              onClick={() => insertBreak(excerptRef.current, excerpt, setExcerpt)}
              className="text-xs font-medium text-accent-blue hover:underline"
            >
              + Add line break
            </button>
          </div>
          <textarea
            ref={excerptRef}
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A quick one-line summary shown on the blog list"
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div className="flex flex-col gap-3">
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="" className="w-full rounded-lg bg-white/[0.03] object-cover" />
          )}
          {coverImage ? (
            <div className="flex flex-wrap items-center gap-2">
              <FileButton accept="image/*" uploading={uploadingKey === "cover"} onUpload={handleCoverUpload}>
                <Replace className="h-4 w-4" />
                Change cover photo
              </FileButton>
              <button type="button" onClick={() => setCoverImage("")} className={btnClass}>
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          ) : (
            <UploadArea
              accept="image/*"
              uploading={uploadingKey === "cover"}
              onUpload={handleCoverUpload}
              label="Add a cover photo"
              hint="Shown at the top of your post and on the blog list. Optional."
              icon={<ImagePlus className="h-5 w-5" />}
            />
          )}
          <p className="text-sm text-white/50">
            Anything you save stays private until the CEO approves it — an approval request is sent by email. New posts and
            edits both need approval before going public.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-white/50">Add to your post:</span>
        <button type="button" onClick={() => addBlock("text")} className={btnClass}>
          <AlignLeft className="h-4 w-4" />
          Paragraph
        </button>
        <button type="button" onClick={() => addBlock("image")} className={btnClass}>
          <ImagePlus className="h-4 w-4" />
          Photo
        </button>
        <button type="button" onClick={() => addBlock("video")} className={btnClass}>
          <Clapperboard className="h-4 w-4" />
          Video
        </button>
        <button type="button" onClick={() => addBlock("youtube")} className={btnClass}>
          <CirclePlay className="h-4 w-4" />
          YouTube
        </button>
        <button type="button" onClick={() => addBlock("pdf")} className={btnClass}>
          <FileText className="h-4 w-4" />
          Document
        </button>
        <button type="button" onClick={() => addBlock("link")} className={btnClass}>
          <Link2 className="h-4 w-4" />
          Link
        </button>
      </div>

      {blocks.length === 0 && (
        <div className="rounded-lg border border-dashed border-white/15 py-12 text-center">
          <p className="text-sm text-white/30">
            Nothing here yet — use the buttons above to add a paragraph, photo, video, document or link.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {blocks.map((block, i) => (
          <div key={block.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <BlockHeader
              name={blockNames[block.type]}
              onMoveUp={() => moveBlock(block.id, -1)}
              onMoveDown={() => moveBlock(block.id, 1)}
              onRemove={() => removeBlock(block.id)}
            />
            {blockEditor(block)}
            <span className="sr-only">Item {i + 1}</span>
          </div>
        ))}
      </div>

      {error && <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={saving || uploadingKey !== null} className={buttonClass}>
          {saving ? "Saving…" : initial ? "Save changes" : "Submit for approval"}
        </button>
        <button type="button" onClick={() => router.push("/admin/blog")} className="text-sm text-white/50 hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}
