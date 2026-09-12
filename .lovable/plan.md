# Cập nhật câu trả lời về lab report

## Mục tiêu
Thay thế câu trả lời liên quan đến lab report trên `/standard` và `/faq` bằng cách diễn đạt ngắn gọn, lịch sự: khách có thể quét mã QR trên chai sản phẩm trong tiệm để xem lab report.

## Thay đổi

### 1. Trang `/standard` — phần "Things you're allowed to ask"
- Giữ nguyên 4 câu hỏi, tiêu đề, typography và bố cục.
- Thay dòng kết hiện tại:
  > "Yes. Yes. We'll tell you. And yes."
- Bằng dòng trả lời chung mới, vẫn đáp ứng cả 4 câu hỏi và nhấn mạnh thông tin quét QR code cho câu lab report:
  > "Yes — scan the QR code on the bottle. Yes. We'll tell you. And yes."

### 2. Trang `/faq` — nhóm "HYGIENE & PRODUCTS"
- Thêm một mục FAQ mới ngay trong nhóm này:
  - **Question:** "Can I see the lab report?"
  - **Answer:** "Yes — every CBD bottle in the salon has a QR code. Scan it and read the lab report yourself."
- Không thay đổi các mục FAQ hiện có.

## Kiểm tra
- Chạy TypeScript typecheck.
- Xem trước `/standard` và `/faq` trên mobile/desktop để xác nhận typography và bố cục không đổi.
