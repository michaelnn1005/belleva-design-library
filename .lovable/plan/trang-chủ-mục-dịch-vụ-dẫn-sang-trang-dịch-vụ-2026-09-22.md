# Trang chủ: mục Dịch vụ dẫn sang trang Dịch vụ

## Mục tiêu
Khi khách bấm vào bất kỳ mục dịch vụ nào ở trang chủ (Nails, 01 Pedicure, 02 Waxing, 03 Lashes), trang sẽ mở trang Dịch vụ và cuộn thẳng tới đúng phần đó, thay vì mở link đặt lịch như hiện nay.

## Thay đổi
- Khối **Nails** (ảnh slideshow bên dưới có tiêu đề Nails): dẫn tới trang Dịch vụ, phần "Nail systems".
- **01 Pedicure**: dẫn tới phần "Pedicures".
- **02 Waxing**: dẫn tới phần "Waxing".
- **03 Lashes**: dẫn tới phần "Lashes".
- Mỗi dòng vẫn bấm được trên toàn bộ chiều rộng như hiện tại; giữ nguyên chữ, cỡ chữ, màu, đường kẻ, khoảng cách và hiệu ứng hover.
- Vì đây là điều hướng trong nội bộ trang web, trang sẽ chuyển mượt, không tải lại toàn bộ.

## Kỹ thuật
- Trong `src/routes/index.tsx` (`ServicesSection`), thay các thẻ `<a href={BOOKING_URL}>` bằng `<Link to="/services" hash="...">` của TanStack Router.
- Anchor đã tồn tại sẵn trong `src/routes/services.tsx`: `nail-systems`, `pedicures`, `waxing`, `lashes`.
- Thêm trường `hash` vào mảng `indexItems`; gỡ import `BOOKING_URL` nếu không còn dùng trong file.

## Ngoài phạm vi
- Không đổi nút Book trên header, thanh cố định dưới cùng, hay bất kỳ section nào khác.
