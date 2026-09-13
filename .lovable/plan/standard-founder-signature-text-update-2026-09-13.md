# /standard founder signature text update

## Goal
Replace the founder signature line at the bottom of the `/standard` page.

## Change
In `src/routes/standard.tsx`, within the FOUNDER NOTE section, change:

```jsx
<p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
  Michael — Founder, Belleva Nails
</p>
```

To:

```jsx
<p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
  Michael Nguyen
</p>
```

Keep the 48px signature spacer, the gold horizontal rule, and all surrounding styling unchanged.

## Verification
- TypeScript typecheck passes.
- `/standard` renders the founder note with "Michael Nguyen" only.
