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
  partySize: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .nullable(),
  note: z.string().trim().max(2000).optional().nullable(),
  consent: z.literal(true, {
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
      party_size: data.partySize ?? null,
      note: data.note ? data.note : null,
      consent: data.consent,
    });

    if (error) {
      console.error("bridal_leads insert failed:", error.message);
      return {
        ok: false as const,
        error: "Something went wrong sending your sign-up. Please call us instead.",
      };
    }

    return { ok: true as const };
  });
