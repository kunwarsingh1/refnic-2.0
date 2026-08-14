"use client";

import { useEffect } from "react";

export function ModelViewer({ src, alt, className }: { src: string; alt?: string; className?: string }) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt ?? ""}
      ar
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      loading="lazy"
      reveal="auto"
      className={className}
    />
  );
}
