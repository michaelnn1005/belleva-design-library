# Xóa toàn bộ SERVICE khỏi thư viện thiết kế

## Thay đổi
- Xóa toàn bộ hàng `SERVICE`, gồm nhãn và bốn chip `Gel-X`, `Builder gel`, `Dipping`, `Acrylic`.
- Xóa trường `service` và danh sách bộ lọc service khỏi dữ liệu thiết kế để chúng không thể xuất hiện lại từ nguồn dữ liệu.
- Giữ nguyên hàng `OCCASION` với năm chip hiện tại và cập nhật logic lọc để chỉ lọc theo occasion/tag.
- Xóa tên service khỏi từng card và modal chi tiết; vẫn giữ dòng giá dưới dạng `from $...`.

## Kiểm tra
- Xác nhận trang không còn chữ hoặc chip service nào.
- Kiểm tra cả năm chip OCCASION vẫn lọc đúng thiết kế.
- Kiểm tra giao diện mobile không còn khoảng trống hoặc lỗi bố cục tại vị trí hàng SERVICE cũ.
- Kiểm tra lại bản preview để loại trừ trạng thái cache/HMR cũ và xác nhận lỗi tải module không còn tái diễn.

## Giới hạn
- Không thay đổi hình ảnh, nội dung các section khác, thiết kế card, giá, hoặc link đặt lịch.
