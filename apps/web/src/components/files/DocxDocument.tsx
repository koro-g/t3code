import { renderAsync } from "docx-preview";
import { useEffect, useRef } from "react";

/**
 * Word document body rendered from an attachment Blob or a signed asset URL.
 * Its own module so `docx-preview` and JSZip load only when a .docx opens.
 */
export default function DocxDocument(props: {
  readonly name: string;
  readonly source: Blob | string;
  readonly onError: (message: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { onError, source } = props;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Each run renders into its own host so a cancelled or superseded render
    // cannot write into the surface after its cleanup.
    const host = document.createElement("div");
    container.replaceChildren(host);
    let cancelled = false;
    void (async () => {
      const blob =
        typeof source === "string"
          ? await (async () => {
              const response = await fetch(source);
              if (!response.ok) throw new Error("Impossible de charger le document Word.");
              return await response.blob();
            })()
          : source;
      if (cancelled) return;
      await renderAsync(blob, host, undefined, { useBase64URL: true });
    })().catch((cause: unknown) => {
      if (!cancelled) {
        onError(cause instanceof Error ? cause.message : "Impossible d'afficher ce document Word.");
      }
    });
    return () => {
      cancelled = true;
      host.remove();
    };
  }, [source, onError]);

  return (
    <div ref={containerRef} aria-label={props.name} className="min-h-0 flex-1 overflow-auto" />
  );
}
