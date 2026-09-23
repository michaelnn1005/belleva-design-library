# Thêm câu trả lời cho "why we chose your tech" trên /standard

## Vấn đề

Homepage có 3 dòng dẫn sang /standard:

1. "Ask to see the lab reports." — /standard trả lời rõ (QR lab report + mục What we use, and why).
2. "Ask us to open the tool pouch in front of you." — /standard trả lời rõ (mục The tray).
3. "Ask why we chose your tech for you." — /standard chỉ liệt kê câu hỏi ("Who's doing my nails, and why them?") và trả lời gộp bằng một dòng "Yes — scan the QR code... We'll tell you. And yes." Không có lời giải thích thực sự vì sao/khách được ghép với tech nào.

## Cách sửa

Trong `src/routes/standard.tsx`, section "THINGS YOU'RE ALLOWED TO ASK" (bg-background, max-w 680px):

- Giữ nguyên heading, danh sách 4 câu hỏi, và dòng gold "Yes — scan the QR code on the bottle. Yes. We'll tell you. And yes."
- Thêm **một đoạn ngay dưới dòng gold đó, margin-top 24px**, trả lời trực tiếp câu hỏi thứ ba. Văn bản gốc y nguyên, không thêm bớt:

> How we match: detailed art goes to a design specialist. On a tight schedule? A tech who is quick and careful. Asked for someone by name in your Note? We book them, or offer a tech with the same skills, or another day.

- Style của đoạn mới: y hệt body copy hiện tại của trang (Inter, 17px, forest ở 80% opacity, max-width 65ch, căn trái) — không thêm màu, font, icon, hay section mới.

## Không đổi

- Homepage: giữ nguyên cả 3 dòng và link.
- Các section khác của /standard: không đụng tới.

## Files

- `src/routes/standard.tsx` — 1 chỗ chèn đoạn văn.

## Kiểm tra

- Typecheck `bunx tsgo`.
- Playwright /standard 393px + 1280px: đoạn mới hiện dưới dòng gold, không vỡ layout.
