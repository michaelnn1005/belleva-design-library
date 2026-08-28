# Dọn sạch phần "thư viện thiết kế": bỏ bộ lọc, tên mẫu và giá

## Vì sao bạn vẫn thấy nhiều chữ
Lần trước chỉ có hàng **SERVICE** bị xóa. Những phần còn lại vẫn nằm trong code và cố ý hiển thị:
- Hàng lọc **OCCASION** (All, Wedding, Everyday, Date night, Holiday)
- Trên mỗi thẻ ảnh: dòng bộ sưu tập (SIGNATURE SET / ART FOCUS / …), tên mẫu, và "from $…"
- Trong modal chi tiết: tên mẫu + giá

Đây không phải bug — chỉ là phần chưa được yêu cầu xóa.

## Sẽ làm gì
1. Xóa toàn bộ hàng lọc OCCASION: nhãn vàng "OCCASION", các chip, state lọc và hàm lọc. Lưới hiển thị tất cả mẫu.
2. Xóa mọi chữ trên thẻ ảnh: bỏ collection, tên mẫu, giá — thẻ chỉ còn ảnh 4:5 bo góc 10px.
3. Xóa chữ trong modal chi tiết: chỉ còn ảnh + nút đặt lịch (Book this design).
4. Dọn dữ liệu trong `src/lib/designs.ts`: bỏ `OCCASION_FILTERS`, `matchesFilter`, và các trường `name`, `collection`, `tags`, `price`; chỉ giữ danh sách id/ảnh để render lưới.
5. Chỉnh phần chữ giới thiệu ngay trên lưới nếu còn nhắc tới bộ lọc/giá, để nội dung khớp với giao diện mới.

## Không đụng tới
Hero, The Belleva Standard, marquee "From Our Clients", Belleva Bridal, The Belleva Vision, footer, sticky bottom bar, header.

## Ghi chú kỹ thuật
Chỉ sửa `src/routes/index.tsx` và `src/lib/designs.ts`. Giữ nguyên animation fade-in, khoảng cách và grid hiện tại; kiểm tra lại build và bố cục mobile 393px sau khi sửa.
