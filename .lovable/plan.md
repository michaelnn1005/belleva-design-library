# Xóa ảnh nails lặp lại khỏi lưới thiết kế

## Vấn đề hiện tại
Cả 12 thẻ trong lưới thiết kế (và modal chi tiết) đều dùng chung một ảnh `nail-library.jpg`, khiến trang trông như bị lỗi lặp ảnh (đúng như ảnh chụp màn hình bạn gửi).

## Thay đổi
1. **Lưới thiết kế** (`src/routes/index.tsx`): bỏ thuộc tính `src={nailLibraryAsset.url}` khỏi mọi thẻ — các ô trở về block placeholder trung tính (nền kem/xanh rừng xen kẽ, chữ "Photo" ở giữa), giữ nguyên tỉ lệ 4:5, bo góc 10px và hiệu ứng fade-in khi cuộn.
2. **Modal chi tiết**: cũng bỏ `src` ảnh nails — chỉ còn placeholder + nút "Book this design".
3. **Giữ nguyên**: ảnh nền hero, ảnh Belleva Bridal, và toàn bộ các phần khác. Khi bạn tải lên 12 ảnh thật, tôi sẽ gán từng ảnh vào từng ô.

## Kỹ thuật
- Component `Placeholder` đã hỗ trợ chế độ không ảnh (hiển thị màu `tone` + nhãn), nên chỉ cần xóa prop `src`, không đổi cấu trúc.
- Không xóa file asset `nail-library.jpg` vì hero vẫn đang dùng.

## Kiểm tra sau khi sửa
- Build sạch.
- Chụp màn hình mobile xác nhận lưới không còn ảnh lặp, modal không còn ảnh.
