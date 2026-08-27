# Plan: Ưu tiên hoàn thiện trải nghiệm mobile

## Vấn đề phát hiện trên mobile (393px, đã chụp toàn trang)

1. **Phần "From our clients" chưa hoàn thiện:** 3 thẻ quote hiển thị placeholder "PHOTO" và chữ "[client quote goes here]" — trông như bản nháp.
2. **Khoảng trống chết quá lớn trên mobile:** padding dọc đã nhân đôi theo yêu cầu trước (`py-48`, `pb-48`, `py-40`) đẹp trên desktop nhưng trên mobile tạo các vùng rỗng lớn (sau band xanh "The Belleva Standard", trước footer), làm trang bị loãng.
3. **Band xanh:** link "Find Belleva Nails on Google Maps" cách nội dung `mt-16`, góp phần tạo vùng trống đáy band.
4. **Hero mobile** đã ổn sau lần chỉnh trước — giữ nguyên.

## Thay đổi đề xuất (chỉ `src/routes/index.tsx`, mobile-first)

### 1. Hoàn thiện phần client quotes
- Viết 3 quote thật, ngắn, đúng tone editorial (ví dụ về độ bền 14 ngày, trải nghiệm studio, chất lượng nail art).
- Thay khối "PHOTO" bằng ảnh nail thật (ảnh A010 đang dùng, crop 4:5) cho cả 3 thẻ — nhất quán với design grid.

### 2. Nén nhịp dọc trên mobile, giữ nguyên desktop
- Grid section: `pb-48` → `pb-24 md:pb-80`.
- Band xanh + quotes: `py-48` → `py-24 md:py-80`.
- Footer: `py-40` → `py-24 md:py-56`.
- Khoảng cách tiêu đề → lưới quote: `mt-16` → `mt-12` (mobile vẫn thoáng, không rỗng).

### 3. Band xanh
- Link Google Maps: `mt-16` → `mt-10`.

### 4. Giữ nguyên
- Hero mobile (100svh, chữ 1/3 trên, cue đáy), filter chips, grid 2 cột, sticky bottom bar, mọi giá trị desktop (`md:*`).

## Kiểm chứng
- Chụp lại toàn trang mobile bằng Playwright: không còn placeholder, không còn vùng trống chết, sticky bar không che nội dung footer.
- Chụp desktop nhanh để xác nhận không hồi quy.
