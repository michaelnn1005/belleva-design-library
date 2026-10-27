import { FINISHES, type FinishId } from "./finishes";

/** Finish chips as a real radio group: arrow keys move between them, focus is clearly visible. */
export function FinishPicker({
  options,
  value,
  onChange,
  tone,
  name,
  compact = false,
}: {
  options: FinishId[];
  value: FinishId;
  onChange: (id: FinishId) => void;
  tone: "dark" | "light";
  name: string;
  /** Smaller chips that fit five on one row at desktop widths. */
  compact?: boolean;
}) {
  const chip =
    tone === "dark"
      ? "border-cream/30 text-cream peer-checked:border-cream peer-checked:bg-cream peer-checked:text-forest peer-focus-visible:ring-gold-light peer-focus-visible:ring-offset-forest"
      : "border-forest/25 text-forest peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:ring-gold peer-focus-visible:ring-offset-cream";

  return (
    <fieldset>
      <legend
        className={`text-[11px] uppercase tracking-[0.14em] ${tone === "dark" ? "text-gold-light" : "text-gold"}`}
      >
        Choose a finish
      </legend>
      <div className={`mt-4 flex flex-wrap ${compact ? "gap-2 lg:flex-nowrap" : "gap-2.5"}`}>
        {options.map((id) => {
          const f = FINISHES[id];
          return (
            <label key={id} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={id}
                checked={value === id}
                onChange={() => onChange(id)}
                className="peer sr-only"
              />
              <span
                className={`inline-flex items-center whitespace-nowrap rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${compact ? "gap-2 px-3 py-1.5 text-[12px]" : "gap-2.5 px-4 py-2 text-[13px]"} ${chip}`}
              >
                <span
                  aria-hidden="true"
                  className={`rounded-full border border-black/10 ${compact ? "h-3 w-3" : "h-3.5 w-3.5"}`}
                  style={{ background: f.swatch }}
                />
                {f.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
