import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const bridalLeadSchema = z.object({
  firstName: z.string().trim().min(1, "Please tell us your first name.").max(100),
  phone: z.string().trim().min(7, "Please enter a phone number we can text.").max(40),
  weddingDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose your wedding date."),
  visitDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  dressColor: z.string().trim().max(100).optional().nullable(),
  designIdea: z.string().trim().max(2000).optional().nullable(),
  partySize: z.number().int().min(1).max(50).optional().nullable(),
  note: z.string().trim().max(2000).optional().nullable(),
  smsConsent: z.literal(true, {
    message: "Please agree so we can text you about your appointments.",
  }),
});

export type BridalLeadInput = z.infer<typeof bridalLeadSchema>;

export const submitBridalLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bridalLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          storage: undefined,
        },
        global: {
          fetch: (input, init) => {
            const h = new Headers(init?.headers);
            const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
            if (h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
            h.set("apikey", key);
            return fetch(input, { ...init, headers: h });
          },
        },
      },
    );

    const { error } = await supabase.from("bridal_leads").insert({
      first_name: data.firstName,
      phone: data.phone,
      wedding_date: data.weddingDate,
      preferred_visit_date: data.visitDate || null,
      dress_color: data.dressColor || null,
      design_idea: data.designIdea || null,
      party_size: data.partySize ?? null,
      note: data.note ? data.note : null,
      sms_consent: data.smsConsent,
    });

    if (error) {
      console.error("bridal_leads insert failed:", error.message);
      return {
        ok: false as const,
        error: "Something went wrong sending your sign-up. Please call us instead.",
      };
    }

    // The sign-up is saved. Tell the salon (email + team sheet); these never block or fail
    // the bride's submission.
    await notifySalon(data);

    return { ok: true as const };
  });

// ---------- notifications ----------
// Secrets (set in Lovable → Cloud → Secrets; each one is optional):
//   RESEND_API_KEY         email via resend.com; without a custom domain Resend only delivers
//                          to the address that owns the Resend account, which is all we need
//   BRIDAL_NOTIFY_EMAIL    where the email goes (default bellevanailsdenton@gmail.com)
//   BRIDAL_SHEET_WEBHOOK   the Google Apps Script web-app URL (see docs/bridal-sheet/)
//   BRIDAL_SHEET_SECRET    shared secret the script checks before adding a row

const escapeHtml = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function describeDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const wedding = Date.UTC(y, m - 1, d);
  // "today" in Denton, so a sign-up in the evening doesn't count from tomorrow (UTC)
  const [ty, tm, td] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" })
    .format(new Date())
    .split("-")
    .map(Number) as [number, number, number];
  const today = Date.UTC(ty, tm - 1, td);
  const days = Math.round((wedding - today) / 86_400_000);
  const pretty = new Date(wedding).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return { pretty, days };
}

async function notifySalon(lead: BridalLeadInput) {
  const { pretty, days } = describeDate(lead.weddingDate);
  const tasks: Promise<unknown>[] = [];

  const resendKey = process.env["RESEND_API_KEY"];
  if (resendKey) {
    const to = process.env["BRIDAL_NOTIFY_EMAIL"] || "bellevanailsdenton@gmail.com";
    const tel = lead.phone.replace(/[^\d+]/g, "");
    const rows: [string, string][] = [
      ["Name", escapeHtml(lead.firstName)],
      [
        "Phone",
        `<a href="tel:${tel}">${escapeHtml(lead.phone)}</a> · <a href="sms:${tel}">Text her</a>`,
      ],
      ["Wedding", `${pretty} (${days} days away)`],
      ["Would like to come in", lead.visitDate ? describeDate(lead.visitDate).pretty : "—"],
      ["Dress colour", lead.dressColor ? escapeHtml(lead.dressColor) : "—"],
      [
        "The look she wants",
        lead.designIdea ? escapeHtml(lead.designIdea).replace(/\n/g, "<br>") : "—",
      ],
      ["Party", lead.partySize ? String(lead.partySize) : "—"],
      ["Anything else", lead.note ? escapeHtml(lead.note) : "—"],
      ["SMS consent", "Yes"],
    ];
    const html = `<div style="font-family:Georgia,serif;color:#1d3127;max-width:520px">
<p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#9a7a43">Belleva bridal · new sign-up</p>
<h2 style="font-weight:400;font-size:26px;margin:6px 0 16px">${escapeHtml(lead.firstName)} · ${pretty}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#5d685f">${k}</td><td style="padding:6px 0">${v}</td></tr>`,
      )
      .join("")}</table>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#5d685f;margin-top:18px">Match her with the nail tech whose work fits this look, text her within 2 hours to confirm the trial, then update the Bridal pipeline sheet.</p></div>`;
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Belleva Bridal <onboarding@resend.dev>",
          to: [to],
          subject: `💍 New bride · ${lead.firstName} · ${pretty} (${days} days)`,
          html,
        }),
        signal: AbortSignal.timeout(6000),
      }).then(async (r) => {
        if (!r.ok) console.error("bridal email failed:", r.status, await r.text());
      }),
    );
  }

  const sheetUrl = process.env["BRIDAL_SHEET_WEBHOOK"];
  if (sheetUrl) {
    tasks.push(
      fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env["BRIDAL_SHEET_SECRET"] ?? "",
          receivedAt: new Date().toISOString(),
          firstName: lead.firstName,
          phone: lead.phone,
          weddingDate: lead.weddingDate,
          visitDate: lead.visitDate ?? "",
          dressColor: lead.dressColor ?? "",
          designIdea: lead.designIdea ?? "",
          partySize: lead.partySize ?? "",
          note: lead.note ?? "",
        }),
        redirect: "follow",
        signal: AbortSignal.timeout(6000),
      }).then((r) => {
        if (!r.ok) console.error("bridal sheet failed:", r.status);
      }),
    );
  }

  const results = await Promise.allSettled(tasks);
  for (const r of results)
    if (r.status === "rejected") console.error("bridal notify error:", r.reason);
}
