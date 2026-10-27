import { useEffect, useRef, useState } from "react";
import type { FinishId } from "./finishes";
import type { NailScene, SceneLayout } from "./scene";

const MIN_WIDTH_QUERY = "(min-width: 768px)";

/**
 * Mounts the three.js nail scene on tablet/desktop only. three is fetched with a
 * dynamic import after the page has loaded and the browser is idle, so it never
 * reaches phones or blocks first paint. Calls onUnavailable when the screen is
 * too small or WebGL is missing, so the parent can show its static fallback.
 */
export function NailsCanvas({
  layout,
  finish,
  className = "",
  onUnavailable,
}: {
  layout: SceneLayout;
  finish: FinishId;
  className?: string;
  onUnavailable?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<NailScene | null>(null);
  const finishRef = useRef(finish);
  const [ready, setReady] = useState(false);
  finishRef.current = finish;

  useEffect(() => {
    if (!window.matchMedia(MIN_WIDTH_QUERY).matches) {
      onUnavailable?.();
      return;
    }
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const load = async () => {
      // Probe for WebGL before fetching three, so devices without it never download it.
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") ?? probe.getContext("webgl"))) {
        onUnavailable?.();
        return;
      }
      const { createNailScene } = await import("./scene");
      if (cancelled || !canvasRef.current) return;
      const scene = createNailScene(canvasRef.current, {
        layout,
        initialFinish: finishRef.current,
        reducedMotion,
      });
      if (!scene) {
        onUnavailable?.();
        return;
      }
      sceneRef.current = scene;
      setReady(true);
    };

    // Wait for the main content, then for an idle moment.
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => void load(), { timeout: 1500 });
      } else {
        setTimeout(() => void load(), 200);
      }
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
    // The scene is built once per layout; finish changes go through setFinish below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  useEffect(() => {
    sceneRef.current?.setFinish(finish);
  }, [finish]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
