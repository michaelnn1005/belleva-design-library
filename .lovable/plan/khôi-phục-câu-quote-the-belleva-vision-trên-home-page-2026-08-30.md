# Khôi phục câu quote "The Belleva Vision" trên home page

## Nguyên nhân
Section "THE BELLEVA VISION" với quote *"You spend your days caring for everyone else. Here, someone cares for you."* đã bị thay thế hoàn toàn: component `VisionReveal` trong `src/routes/index.tsx` (dòng 273–314) giờ chứa nội dung "THE FOUNDER" (teaser dẫn tới trang /standard). Quote gốc không còn ở đâu trong trang.

## Cách sửa
Thêm lại section quote như một block riêng, KHÔNG xóa section "THE FOUNDER" hiện tại:

1. **Vị trí:** giữa section "Belleva Bridal" và section "The Founder" — đúng vị trí cũ của nó.
2. **Nội dung khôi phục nguyên văn:**
   - Background forest green, padding dọc rộng (py-24 trở lên).
   - Eyebrow gold "THE BELLEVA VISION" — Inter 10-11px, uppercase, tracking 2px, căn giữa.
   - Quote Cormorant Garamond italic, cream #F5F0E8, ~26px mobile, max-w 320px, căn giữa:
     "You spend your days caring for everyone else. Here, someone cares for you."
   - Dòng chữ ký dưới quote: "BELLEVA — DENTON, TX", Inter uppercase, tracking 2px, cream.
   - Không ảnh, không nút, không dots.
3. **Animation:** fade + rise khi scroll (dùng `useFadeUp` như các section khác); nếu muốn giữ hiệu ứng staged line-by-line reveal từng làm trước đó thì khôi phục đúng hiệu ứng đó: eyebrow trước, quote từng dòng, chữ ký cuối.

## Files touched
- `src/routes/index.tsx` (thêm component section mới + render giữa Bridal và VisionReveal/Founder).

## Kiểm chứng
- Build pass; chụp screenshot mobile xác nhận section quote hiển thị giữa Bridal và Founder.
