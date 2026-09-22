# "Book your trial" trên hero /bridal — đổi đích dẫn

## Đề xuất

Nút **"Book your trial"** ở hero (mục đầu tiên) dẫn tới **form đăng ký bridal** ngay dưới trang (cuộn tới `#join`) thay vì mở trang booking bên ngoài.

Lý do: khách ở hero mới chỉ "quan tâm", chưa sẵn sàng chọn giờ. Bước đúng là ghi lại ngày cưới vào form để salon chủ động nhắn tin hẹn trial — đúng như luồng vừa xây. Khách đã đọc hết trang và muốn đặt ngay sẽ dùng nút **"Book your trial"** ở band CTA cuối trang; nút đó giữ nguyên link booking `bellevanail.com/booking` như hiện tại.

Luồng trở thành:

```text
Hero "Book your trial"  →  cuộn tới form "Save your wedding date."
Band CTA cuối trang      →  giữ nguyên link booking (khách sẵn sàng đặt ngay)
```

## Thay đổi

1. `src/routes/bridal.tsx` hero (nút tại dòng ~370): thay `<a href={BOOKING_URL} target="_blank">` bằng `<Link to="/bridal" hash="join">` của TanStack Router, giữ nguyên chữ "Book your trial", style pill off-white outline, hover nền off-white/chữ forest. Dẫn cuộn mượt tới form, không tải lại trang.
2. Nút "Book your trial" trong band CTA cuối trang (dòng ~571) **không đổi** — vẫn link booking.
3. Không sửa section khác, không sửa trang khác.

## Việc dọn dẹp kèm theo

- Xóa 2 dòng dữ liệu thử nghiệm (Linh, Mai) trong bảng `bridal_leads` do kiểm thử tự động tạo, để bảng sạch trước khi go-live.

## Kiểm chứng

- Typecheck pass.
- Playwright: bấm "Book your trial" ở hero → trang cuộn tới form; gửi thử form 1 lần → hiện thông báo cảm ơn và có dòng trong `bridal_leads`; sau đó xóa dòng thử nghiệm.
