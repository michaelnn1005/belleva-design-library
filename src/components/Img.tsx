import type { CSSProperties } from "react";
import type { OptimizedImage } from "@/lib/images";

// Responsive <picture> for the AVIF/WebP variants generated under /public/img.
// The browser picks the smallest variant that covers the rendered width given in `sizes`.

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_QUERY = "(min-width: 1024px)";
// 1x1 transparent GIF: lets a desktop-hidden image skip its download at lg+.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function variantUrl(image: OptimizedImage, width: number, format: "avif" | "webp") {
  return `/img/${image.name}-${width}.${format}`;
}

function srcSetFor(image: OptimizedImage, format: "avif" | "webp") {
  return image.widths.map((w) => `${variantUrl(image, w, format)} ${w}w`).join(", ");
}

export function Img({
  image,
  mobile,
  alt,
  sizes = "100vw",
  className,
  style,
  priority = false,
  decorative = false,
  skipOnDesktop = false,
}: {
  image: OptimizedImage;
  /** Different crop to use below 768px (e.g. a portrait hero). */
  mobile?: OptimizedImage;
  alt: string;
  /** Rendered width per breakpoint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Above the fold: load eagerly at high priority instead of lazily. */
  priority?: boolean;
  /** Purely visual image, hidden from assistive tech. */
  decorative?: boolean;
  /** The image is hidden at lg+ (desktop); don't download it there. */
  skipOnDesktop?: boolean;
}) {
  const largest = image.widths.at(-1) ?? image.width;

  return (
    <picture className="contents">
      {skipOnDesktop && <source media={DESKTOP_QUERY} srcSet={BLANK} />}
      {mobile && (
        <>
          <source media={MOBILE_QUERY} type="image/avif" srcSet={srcSetFor(mobile, "avif")} sizes={sizes} />
          <source media={MOBILE_QUERY} type="image/webp" srcSet={srcSetFor(mobile, "webp")} sizes={sizes} />
        </>
      )}
      <source type="image/avif" srcSet={srcSetFor(image, "avif")} sizes={sizes} />
      <img
        src={variantUrl(image, largest, "webp")}
        srcSet={srcSetFor(image, "webp")}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        aria-hidden={decorative || undefined}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
