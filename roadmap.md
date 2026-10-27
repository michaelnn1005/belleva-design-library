# Roadmap

- [x] Forms audit plan approved: 1 form (bridal), email notifications
- [x] Remove footer contact form + demo note from SiteFooter.tsx (keep address, hours, phone, socials, Book)
- [x] Careers: remove demo form, add "Email Michael" mailto:michaelnn1005@gmail.com, update all /careers emails to gmail
- [x] Typecheck + Playwright at 393/768/1280: no form anywhere except /bridal (bridal form intact, 6 fields)
- [ ] Bridal lead email notification to bellevanailsdenton@gmail.com — best-effort notification remains inactive until custom-domain email setup
- [x] Rename bridal lead consent storage to sms_consent
- [x] Verify one complete bridal test lead through the form, then delete it
- [x] Keep homepage bridal button targeting /bridal#join, update helper copy, and offset the form anchor below the fixed header

- [x] Apply shared tablet/desktop container, rhythm, hero, header, and footer layout system

## Ideas (not started)

- [ ] Bridal page, tablet/desktop: reuse the 3D lab "Version B" idea (one large coffin nail the visitor turns by dragging, Bridal pearl finish first, then French) as a close-up "try your wedding set" moment near "How it works". Components already exist in src/components/lab/ (NailsHeroB, nails3d/*); keep the lazy three.js load, WebGL/reduced-motion fallbacks, and phone layout untouched.

## Waiting on photos / decisions (Claude reminds at the start of each session)

- [ ] Founder note photo (Standard › "A note from the founder"): broken placeholder removed; add a close-up of Michael's hands (brush/file, or appointment book + coffee) when ready.
- [ ] "Your appointment" photo (Standard, desktop): temporarily the FAQ iced-coffee photo; replace with a real close-up check-in shot.
- [ ] Home hero video: social team shoots per the "Belleva Hero Video Brief" doc; becomes lab Version C before Home.
- [ ] 3D hero lab (/lab/nails-hero): decide keep, replace with video, or remove.
- [ ] Lovable security warning: bridal_leads readable/editable by any signed-in user; fix pending approval.
- [ ] Publish today's changes to the live site after review on Lovable.
- [ ] package-lock.json duplicates bun.lock; decide whether to keep it.
