# Plan: Kiểm thử và xác nhận hero mới của `/standard`

## Trạng thái hiện tại (đã đọc `src/routes/standard.tsx`)

Phần Opening trên `/standard` đã được rebuild thành image hero:

- Chiều cao: `h-[60vh] min-h-[440px]` mobile, `md:h-[70vh] md:min-h-[520px]` desktop.
- Background: placeholder `bg-forest` (#2F4A3E), full-bleed, `aria-label` đúng.
- Overlay: `bg-forest/45` — flat, không gradient.
- Content: bottom-left trong cột `max-w-[720px]`, `pb-10` mobile / `pb-16` desktop.
- Label: `THE BELLEVA STANDARD`, Inter 12px uppercase, tracking 0.12em, gold.
- Heading: Cormorant 36px mobile / 56px desktop, leading 1.1, off-white, max-w 640px.
- Subline: Inter 17px, off-white/85, max-w 480px.
- Animation: `FadeUpSection` fade-up on load.

## Việc cần làm

1. **Chạy build** để xác nhận không có lỗi biên dịch.
2. **Chụp preview** bằng Playwright ở hai kích thước:
   - Mobile: 393×805 (giống viewport hiện tại của bạn).
   - Desktop: 1280×900.
3. **Kiểm tra runtime error** hiện có: `Failed to fetch dynamically imported module` từ `@tanstack/react-start`. Nếu lỗi này còn xuất hiện sau build, xác định xem nó có liên quan đến thay đổi Opening hay không (thường là lỗi dev server / HMR, không liên quan đến nội dung route).
4. **Báo cáo kết quả**: nếu hero hiển thị đúng spec, xác nhận hoàn thành. Nếu có lỗi, liệt kê cụ thể để bạn quyết định revert.

## Phương án revert (sẵn sàng nếu bạn yêu cầu)

Nếu bạn muốn quay lại layout cũ, tôi sẽ:
- Thay section hero hiện tại bằng phiên bản Opening cũ (nếu còn trong lịch sử git hoặc có thể tái tạo từ context).
- Giữ nguyên tất cả các section phía dưới.

## Lưu ý

- Không thay đổi section nào khác ngoài Opening.
- Không thêm icon, shadow, gradient.
