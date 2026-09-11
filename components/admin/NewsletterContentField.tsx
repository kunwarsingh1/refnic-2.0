"use client";

import { useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ImagePlus, Loader2, Replace, Trash2 } from "lucide-react";
import { uploadImage } from "@/lib/upload";
import type { Block } from "@/lib/content/blog";
import { inputClass } from "@/components/admin/formStyles";

const btnClass =
  "inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-50";

function blockLabel(type: Block["type"]): string {
  return type === "text" ? "Paragraph" : type === "image" ? "Photo" : type;
}

export function NewsletterContentField({ name, defaultValue }: { name: string; defaultValue?: Block[] }) {
  const [blocks, setBlocks] = useState<Block[]>(defaultValue ?? []);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  function addBlock(type: "text" | "image") {
    const id = crypto.randomUUID();
    const block: Block =
      type === "text" ? { id, type: "text", text: "" } : { id, type: "image", url: "", align: "center" };
    setBlocks((prev) => [...prev, block]);
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

  async function handleImageUpload(id: string, file: File) {
    setUploadingId(id);
    const { url, error } = await uploadImage(file);
    setUploadingId(null);
    if (!error && url) updateBlock(id, { url } as Partial<Block>);
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />

      <label className="mb-1 block text-sm font-medium text-white/70">
        Body <span className="text-white/40">(shown on the post's own page)</span>
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => addBlock("text")} className={btnClass}>
          <AlignLeft className="h-4 w-4" />
          Add paragraph
        </button>
        <button type="button" onClick={() => addBlock("image")} className={btnClass}>
          <ImagePlus className="h-4 w-4" />
          Add photo
        </button>
      </div>

      {blocks.length === 0 && (
        <div className="mt-3 rounded-lg border border-dashed border-white/15 py-8 text-center">
          <p className="text-sm text-white/30">No body content yet — add a paragraph or photo above.</p>
        </div>
      )}

      <div className="mt-3 space-y-3">
        {blocks.map((block) => {
          const uploading = uploadingId === block.id;
          return (
            <div key={block.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  {blockLabel(block.type)}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveBlock(block.id, -1)} title="Move up" className="rounded p-1.5 text-white/50 hover:bg-white/10">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => moveBlock(block.id, 1)} title="Move down" className="rounded p-1.5 text-white/50 hover:bg-white/10">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => removeBlock(block.id)} title="Remove" className="rounded p-1.5 text-white/50 hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {block.type === "text" ? (
                <textarea
                  value={block.text}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  placeholder="Write a paragraph…"
                  rows={Math.max(3, Math.min(12, block.text.split("\n").length + 1))}
                  className={`${inputClass} resize-y leading-relaxed`}
                />
              ) : block.type === "image" ? (
                <div>
                  {block.url ? (
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={block.url} alt="" className="w-full rounded-lg bg-white/[0.03] object-contain" />
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <label className={`${btnClass} cursor-pointer`}>
                          <Replace className="h-4 w-4" />
                          Change picture
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(block.id, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <button type="button" onClick={() => updateBlock(block.id, { url: "" } as Partial<Block>)} className={btnClass}>
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>

                      <div className="mt-3">
                        <span className="mb-1.5 block text-xs font-medium text-white/50">Position on the page</span>
                        <div className="inline-flex overflow-hidden rounded-md border border-white/15">
                          {(["left", "center", "right"] as const).map((align) => {
                            const Icon = align === "left" ? AlignLeft : align === "right" ? AlignRight : AlignCenter;
                            const active = (block.align ?? "center") === align;
                            return (
                              <button
                                key={align}
                                type="button"
                                onClick={() => updateBlock(block.id, { align } as Partial<Block>)}
                                title={align.charAt(0).toUpperCase() + align.slice(1)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                                  active ? "bg-accent-blue text-white" : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-start gap-2">
                      <span className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-white/20 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.06]">
                        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
                        {uploading ? "Uploading…" : "Choose a picture"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(block.id, file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
