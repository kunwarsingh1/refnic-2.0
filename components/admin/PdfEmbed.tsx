"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PDFDocumentLoadingTask } from "pdfjs-dist";

export function PdfEmbed({
  url,
  title,
  downloadButton,
  light,
}: {
  url: string;
  title?: string;
  downloadButton?: ReactNode;
  /** Use dark text/borders instead of the default light-on-dark styling, for placement on a light background. */
  light?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;
    const container = containerRef.current;

    async function run() {
      if (!container) return;
      container.innerHTML = "";
      setLoading(true);
      setError(null);
      setPageCount(null);

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        loadingTask = pdfjs.getDocument({ url });
        const doc = await loadingTask.promise;
        if (cancelled) return;

        setPageCount(doc.numPages);

        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const width = container.clientWidth || base.width;
          const scale = width / base.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.display = "block";
          canvas.style.width = "100%";
          canvas.style.height = "auto";

          container.appendChild(canvas);

          await page.render({ canvas, viewport }).promise;
          page.cleanup();
        }

        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load PDF.");
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [url]);

  return (
    <div className="my-8">
      {(title || downloadButton) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && (
            <p className={`text-sm font-medium uppercase tracking-wide ${light ? "text-black/40" : "text-white/40"}`}>
              {title}
            </p>
          )}
          {downloadButton}
        </div>
      )}
      {loading && (
        <div
          className={`flex items-center justify-center rounded-lg border py-16 text-sm ${
            light ? "border-black/10 bg-black/[0.03] text-black/50" : "border-white/10 bg-white/[0.03] text-white/50"
          }`}
        >
          Rendering pages…
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-8 text-sm text-red-300">
          Could not display this document: {error}
        </div>
      )}
      <div
        ref={containerRef}
        className="[&>canvas]:shadow-sm"
        onContextMenu={(e) => e.preventDefault()}
      />
      {pageCount !== null && (
        <p className={`mt-3 text-xs ${light ? "text-black/30" : "text-white/30"}`}>
          {pageCount} page{pageCount === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}
