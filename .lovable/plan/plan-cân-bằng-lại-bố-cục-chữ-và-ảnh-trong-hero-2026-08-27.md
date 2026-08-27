# Plan: Cân bằng lại bố cục chữ và ảnh trong hero

## Vấn đề hiện tại (đã xác nhận bằng ảnh chụp preview)

1. **Desktop:** ảnh nền crop tại `center 55%` đưa các móng tay lên sát đỉnh màn hình, nằm ngay sau H1 — chữ đè lên móng, mất nhịp thị giác.
2. **Mobile:** H1 "Find your next set." tự ngắt dòng thành "Find your next" / "set." — chữ "set." lẻ loi một dòng. Subline dài, sát vùng bàn tay.
3. **Cả hai:** cue "Browse the library" ở đáy đè lên móng tay trong ảnh, khó đọc.

## Thay đổi đề xuất (chỉ trong `src/routes/index.tsx`)

### 1. Điều chỉnh vị trí crop ảnh theo viewport
- Mobile giữ `object-[center_55%]` (móng nằm nửa dưới, đang ổn).
- Desktop đổi thành `md:object-[center_78%]` — dịch vùng nhìn xuống phần dưới ảnh (bàn tay giữa + mặt dây chuyền), đẩy các móng sát đỉnh ra khỏi khung, tạo vùng da/tay "yên tĩnh" ở 1/3 trên cho chữ.

### 2. Sửa nhịp chữ trên mobile
- H1 ngắt dòng có chủ đích thành hai dòng cân đối: "Find your" / "next set." (dùng `<br className="md:hidden" />`), tránh tình trạng "set." lẻ dòng.
- Subline giới hạn `max-w-[280px] md:max-w-none` để ngắt dòng gọn hơn, không chạm vùng tay.
- Giữ nhịp dọc đều: eyebrow → H1 → subline với khoảng cách cố định (`mt-5` / `mt-6`).

### 3. Sửa cue "Browse the library"
- Nâng cue lên khỏi mép đáy (`bottom-10`) và thêm đệm dọc để không đè lên móng trong ảnh.
- Giữ kiểu hiện tại (chữ eyebrow + hairline + mũi tên), chỉ chỉnh vị trí.

### 4. Giữ nguyên
- Overlay phẳng `rgba(20,30,25,0.38)`, không gradient.
- Header đổi màu khi scroll qua hero, 100svh, mọi style typography hiện có.

## Kiểm chứng
- Chụp lại bằng Playwright ở 393px và 1280px: xác nhận 1/3 trên desktop không còn móng sau chữ, H1 mobile ngắt dòng cân, cue đáy không đè móng.
