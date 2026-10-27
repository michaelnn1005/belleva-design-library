// three.js scene for the experimental nail hero. Loaded with a dynamic import so
// three never ships in the main bundle; nothing here runs on the server.
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  BackSide,
  BoxGeometry,
  PlaneGeometry,
  PerspectiveCamera,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from "three";
import type { FinishId } from "./finishes";

export type SceneLayout = "cluster" | "single";

export type NailScene = {
  setFinish: (id: FinishId) => void;
  dispose: () => void;
};

type Options = {
  layout: SceneLayout;
  initialFinish: FinishId;
  reducedMotion: boolean;
};

// ---------------------------------------------------------------- geometry

/**
 * Coffin (ballerina) nail as a smooth parametric shell. The top surface is curved
 * across its width (C-curve) and along its length; the underside sits below it by a
 * thickness that thins toward the tip and closes to nothing at the side edges, so the
 * edge reads as a rounded lip rather than a flat band. The cuticle edge is a soft U.
 * u runs across the nail (-1..1), v from the cuticle (0) to the tip (1).
 */
function coffinGeometry(): BufferGeometry {
  const W = 0.5; // half width at the widest point
  const H = 1.9; // length
  const U = 48;
  const V = 96;
  const T = 0.05; // thickness at the cuticle
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  // Rounded shoulders at the cuticle, widest just past it, tapering to a tip ~40% as wide.
  const halfWidth = (v: number) =>
    W * (0.9 + 0.4 * v - 0.85 * v * v) * (0.82 + 0.18 * smooth(0, 0.14, v)) * (1 - 0.08 * smooth(0.97, 1, v));
  // Thickness: thins toward the tip, closes at the side edges and eases in at the cuticle.
  const thickness = (u: number, v: number) =>
    T * (1 - 0.7 * v) * Math.sqrt(Math.max(0, 1 - u ** 8)) * (0.35 + 0.65 * smooth(0, 0.08, v));
  const surface = (u: number, v: number, under: boolean): [number, number, number] => {
    const x = u * halfWidth(v);
    // Soft U-shaped cuticle; the tip edge stays straight (the C-curve gives it a gentle arc).
    const y = v * H - 0.17 * Math.pow(1 - u * u, 0.7) * (1 - v) ** 4;
    const mid = -0.6 * x * x - 0.06 * (y - H * 0.45) ** 2;
    const t = thickness(u, v);
    return [x, y - H / 2, under ? mid - t / 2 : mid + t / 2];
  };

  const positions: number[] = [];
  const uvs: number[] = [];
  const index: number[] = [];
  const grid = (under: boolean) => {
    const base = positions.length / 3;
    for (let j = 0; j <= V; j++) {
      for (let i = 0; i <= U; i++) {
        const u = (i / U) * 2 - 1;
        const v = j / V;
        positions.push(...surface(u, v, under));
        uvs.push((u + 1) / 2, v);
      }
    }
    for (let j = 0; j < V; j++) {
      for (let i = 0; i < U; i++) {
        const a = base + j * (U + 1) + i;
        const b = a + 1;
        const c = a + (U + 1);
        const d = c + 1;
        if (under) index.push(a, b, c, b, d, c);
        else index.push(a, c, b, b, c, d);
      }
    }
    return base;
  };
  const top = grid(false);
  const bottom = grid(true);
  // Rim: stitch the outer edge of the top surface to the underside.
  const rim = (a0: number, a1: number, b0: number, b1: number) => index.push(a0, b0, a1, a1, b0, b1);
  for (let j = 0; j < V; j++) {
    const l = j * (U + 1);
    const r = j * (U + 1) + U;
    rim(top + l + U + 1, top + l, bottom + l + U + 1, bottom + l); // left side
    rim(top + r, top + r + U + 1, bottom + r, bottom + r + U + 1); // right side
  }
  const tipRow = V * (U + 1);
  for (let i = 0; i < U; i++) {
    rim(top + i, top + i + 1, bottom + i, bottom + i + 1); // cuticle
    rim(top + tipRow + i + 1, top + tipRow + i, bottom + tipRow + i + 1, bottom + tipRow + i); // flat tip
  }

  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

/**
 * A dark studio with a few hard, very bright softboxes plus a forest-green and a cream
 * panel. Baked through PMREM it gives chrome deep blacks, crisp highlights and a hint
 * of the brand colours in its reflections; no HDR file needed.
 */
function studioScene() {
  const studio = new Scene();
  const room = new Mesh(new BoxGeometry(20, 12, 20), new MeshBasicMaterial({ color: "#3a433f", side: BackSide }));
  studio.add(room);
  const panel = (w: number, h: number, color: string, intensity: number, pos: [number, number, number], look: [number, number, number]) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity) }));
    m.position.set(...pos);
    m.lookAt(...look);
    studio.add(m);
  };
  // Behind the camera (what a nail facing us mirrors): cream on one side, forest on the other.
  panel(11, 8, "#f5f0e8", 1.9, [-1.5, 0.5, 9.5], [0, 0, 0]);
  panel(3.2, 8, "#4b6458", 1.0, [6.2, 0.5, 9], [0, 0, 0]);
  // Hard softboxes for crisp highlights along the curves.
  panel(6, 1.0, "#ffffff", 10, [0, 5.5, 3], [0, 0, 0]); // overhead strip
  panel(1.2, 7, "#ffffff", 8, [-6.5, 0.5, 2.5], [0, 0, 0]); // key strip, left
  panel(0.9, 6, "#fff4e4", 5, [6.5, 0, 3.5], [0, 0, 0]); // warm rim, right
  panel(10, 5, "#2f4a3e", 1.2, [0, -1, -9], [0, 0, 0]); // forest back wall
  panel(8, 3, "#f5f0e8", 0.9, [0, -5.5, 2], [0, 0, 0]); // cream bounce from below
  return studio;
}

// ---------------------------------------------------------------- textures

function canvasTexture(draw: (ctx: CanvasRenderingContext2D, size: number) => void, size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  draw(ctx, size);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function frenchTexture() {
  return canvasTexture((ctx, n) => {
    ctx.fillStyle = "#e2b6a6";
    ctx.fillRect(0, 0, n, n);
    // Smile line: canvas y is flipped against uv v, so the tip is at the top.
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(n, 0);
    ctx.lineTo(n, n * 0.2);
    ctx.quadraticCurveTo(n / 2, n * 0.36, 0, n * 0.2);
    ctx.closePath();
    ctx.fill();
  });
}

function catEyeTexture() {
  const t = canvasTexture((ctx, n) => {
    ctx.fillStyle = "#2c0f24";
    ctx.fillRect(0, 0, n, n);
    // A soft diagonal band of shimmer; its offset follows the pointer.
    const g = ctx.createLinearGradient(0, 0, n, 0);
    g.addColorStop(0.0, "rgba(90,35,70,0)");
    g.addColorStop(0.3, "rgba(110,45,88,0.35)");
    g.addColorStop(0.46, "rgba(205,150,190,0.75)");
    g.addColorStop(0.5, "rgba(245,215,238,0.95)");
    g.addColorStop(0.54, "rgba(205,150,190,0.75)");
    g.addColorStop(0.7, "rgba(110,45,88,0.35)");
    g.addColorStop(1.0, "rgba(90,35,70,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, n, n);
    // Fine sparkle.
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * n;
      const y = Math.random() * n;
      const band = Math.exp(-(((x / n - 0.5) / 0.16) ** 2));
      ctx.fillStyle = `rgba(255,230,250,${0.15 + 0.6 * band * Math.random()})`;
      ctx.fillRect(x, y, 1.2, 1.2);
    }
  });
  t.wrapS = RepeatWrapping;
  return t;
}

// ---------------------------------------------------------------- materials

function makeMaterials() {
  const catEyeMap = catEyeTexture();
  const mats: Record<FinishId, MeshPhysicalMaterial> = {
    chrome: new MeshPhysicalMaterial({
      color: new Color("#f4f4f2"),
      metalness: 1,
      roughness: 0.025,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
    }),
    "cat-eye": new MeshPhysicalMaterial({
      color: new Color("#ffffff"),
      map: catEyeMap,
      emissive: new Color("#ffffff"),
      emissiveMap: catEyeMap,
      emissiveIntensity: 0.25,
      metalness: 0.35,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    }),
    // Glazed and pearl get their glow from sheen + clearcoat rather than iridescence,
    // which blows out to white on some GPUs.
    glazed: new MeshPhysicalMaterial({
      color: new Color("#d98f9b"),
      metalness: 0.05,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      sheen: 0.6,
      sheenRoughness: 0.3,
      sheenColor: new Color("#ffe6ea"),
    }),
    french: new MeshPhysicalMaterial({
      color: new Color("#d9c3ba"),
      map: frenchTexture(),
      metalness: 0,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
    }),
    pearl: new MeshPhysicalMaterial({
      color: new Color("#d6c2b4"),
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      sheen: 0.5,
      sheenRoughness: 0.3,
      sheenColor: new Color("#f0d9ea"),
    }),
  };
  return { mats, catEyeMap };
}

// ---------------------------------------------------------------- layout

type NailSlot = { x: number; y: number; z: number; rz: number; scale: number };

const CLUSTER: NailSlot[] = [
  { x: -1.86, y: -0.42, z: -0.25, rz: 0.4, scale: 0.8 },
  { x: -0.94, y: 0.18, z: 0.1, rz: 0.2, scale: 0.92 },
  { x: 0.02, y: 0.42, z: 0.32, rz: 0, scale: 1 },
  { x: 0.98, y: 0.16, z: 0.08, rz: -0.2, scale: 0.92 },
  { x: 1.9, y: -0.44, z: -0.26, rz: -0.4, scale: 0.78 },
];
const SINGLE: NailSlot[] = [{ x: 0, y: 0.05, z: 0, rz: -0.22, scale: 1.4 }];

// ---------------------------------------------------------------- scene

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

/** Returns null when WebGL is unavailable so the caller can fall back to the static layout. */
export function createNailScene(canvas: HTMLCanvasElement, opts: Options): NailScene | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(studioScene(), 0.02);
  scene.environment = envRT.texture;

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, opts.layout === "single" ? 7.2 : 9.2);

  scene.add(new HemisphereLight("#fff8f0", "#2f4a3e", 0.5));
  const key = new DirectionalLight("#ffffff", 2.2);
  key.position.set(2, 3, 5);
  scene.add(key);

  const { mats, catEyeMap } = makeMaterials();
  const geometry = coffinGeometry();
  const rig = new Group();
  scene.add(rig);

  const slots = opts.layout === "single" ? SINGLE : CLUSTER;
  const nails = slots.map((slot, i) => {
    const pivot = new Group(); // per-nail spin + bob
    pivot.position.set(slot.x, slot.y, slot.z);
    pivot.rotation.z = slot.rz;
    const mesh = new Mesh(geometry, mats[opts.initialFinish]);
    mesh.scale.setScalar(slot.scale);
    pivot.add(mesh);
    rig.add(pivot);
    return {
      pivot,
      mesh,
      slot,
      phase: i * 1.3,
      spinStart: -1,
      pending: null as FinishId | null,
      introDelay: i * 90,
    };
  });

  // Pointer: normalised -1..1 over the window; the rig tilts and the key light follows.
  const pointer = new Vector2(0, 0);
  const tilt = new Vector2(0, 0);
  const onPointer = (e: PointerEvent) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // Single layout (version B): drag to turn the nail.
  let drag = 0;
  let dragVel = 0;
  let dragging = false;
  let lastX = 0;
  const onDown = (e: PointerEvent) => {
    if (opts.layout !== "single") return;
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    dragVel = (e.clientX - lastX) * 0.01;
    drag += dragVel;
    lastX = e.clientX;
  };
  const onUp = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // Only render while the hero is on screen and the tab is visible.
  let onScreen = true;
  const io = new IntersectionObserver(([entry]) => {
    onScreen = !!entry?.isIntersecting;
    schedule();
  });
  io.observe(canvas);
  const onVisibility = () => schedule();
  document.addEventListener("visibilitychange", onVisibility);

  const start = performance.now();
  let raf = 0;
  const SPIN_MS = 900;

  function frame(now: number) {
    raf = 0;
    const t = (now - start) / 1000;

    // Tilt toward the pointer, eased.
    tilt.lerp(pointer, opts.reducedMotion ? 1 : 0.06);
    rig.rotation.y = tilt.x * 0.35 + (opts.layout === "single" ? drag : 0);
    // The single nail leans back a little so its C-curve reads.
    rig.rotation.x = tilt.y * 0.22 + (opts.layout === "single" ? -0.45 : 0);
    if (!dragging) {
      dragVel *= 0.92;
      drag += opts.reducedMotion ? 0 : dragVel;
    }
    key.position.set(2 + tilt.x * 4, 3 - tilt.y * 3, 5);
    catEyeMap.offset.x = -tilt.x * 0.35 - (opts.layout === "single" ? drag * 0.15 : 0);

    for (const n of nails) {
      // Intro: staggered scale-in.
      const introT = opts.reducedMotion
        ? 1
        : Math.min(1, Math.max(0, (now - start - n.introDelay) / 700));
      n.pivot.scale.setScalar(easeOutBack(introT));
      // Idle bob and sway.
      if (!opts.reducedMotion) {
        n.pivot.position.y = n.slot.y + Math.sin(t * 0.9 + n.phase) * 0.06;
        n.pivot.rotation.x = Math.sin(t * 0.6 + n.phase) * 0.06;
      }
      // Finish change: one full turn, swapping material while edge-on.
      if (n.spinStart >= 0) {
        const p = Math.min(1, (now - n.spinStart) / SPIN_MS);
        if (p > 0) {
          const angle = easeInOut(p) * Math.PI * 2;
          n.mesh.rotation.y = angle;
          if (n.pending && angle >= Math.PI / 2) {
            n.mesh.material = mats[n.pending];
            n.pending = null;
          }
          if (p >= 1) {
            n.mesh.rotation.y = 0;
            n.spinStart = -1;
          }
        }
      }
    }

    renderer.render(scene, camera);
    // Reduced motion: stop once settled; pointer moves and finish changes wake it again.
    if (animating()) schedule();
  }

  function animating() {
    return !opts.reducedMotion || nails.some((n) => n.spinStart >= 0);
  }

  function schedule() {
    if (raf || !onScreen || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  if (opts.reducedMotion) window.addEventListener("pointermove", schedule, { passive: true });
  // Compile shaders off the main thread where the browser supports it, then start drawing.
  let disposed = false;
  renderer
    .compileAsync(scene, camera)
    .catch(() => undefined)
    .then(() => {
      if (!disposed) schedule();
    });

  return {
    setFinish(id) {
      const now = performance.now();
      nails.forEach((n, i) => {
        if (opts.reducedMotion) {
          n.mesh.material = mats[id];
        } else {
          n.pending = id;
          n.spinStart = now + i * 70;
        }
      });
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointermove", schedule);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      Object.values(mats).forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
