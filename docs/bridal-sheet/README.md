# Bridal sign-ups → email + Google Sheet

Mỗi khi cô dâu gửi form ở trang Bridal:

1. Đăng ký được lưu vào cơ sở dữ liệu Lovable (bảng `bridal_leads`), như hiện nay.
2. Một email gửi về **bellevanailsdenton@gmail.com** (qua Resend).
3. Một dòng mới được thêm vào Google Sheet **Bridal pipeline** để cả team theo dõi.

Bước 2 và 3 chỉ chạy khi đã cài các khóa dưới đây. Nếu chưa cài, hoặc nếu bị lỗi, đăng ký vẫn được lưu và cô dâu không thấy lỗi.

---

## A. Email qua Resend (khoảng 2 phút)

1. Vào **resend.com** → Sign up **bằng chính bellevanailsdenton@gmail.com**.
   Khi chưa có tên miền riêng, Resend chỉ gửi được tới email chủ tài khoản. Ở đây đó chính là email cần nhận thông báo, nên không cần tên miền.
2. Trong Resend: **API Keys → Create API key** (quyền "Sending access") → Copy.
3. Trong Lovable: **Cloud → Secrets → Add secret**
   - Name: `RESEND_API_KEY`
   - Value: dán khóa vừa copy.
4. (Không bắt buộc) Muốn gửi tới email khác thì thêm secret `BRIDAL_NOTIFY_EMAIL` với địa chỉ đó. Email này phải là email chủ tài khoản Resend, hoặc tiệm đã xác minh tên miền trên Resend.

## B. Google Sheet cho team (khoảng 5 phút)

1. Tạo một Google Sheet mới, đặt tên ví dụ "Belleva – Bridal", rồi chia sẻ cho team.
2. **Extensions → Apps Script**. Xoá hết nội dung có sẵn, dán toàn bộ file `Code.gs` trong thư mục này vào → **Save**.
   Nếu Google báo "unable to open the file" (thường gặp khi Chrome đăng nhập nhiều tài khoản), vào **script.google.com → New project**, dán `Code.gs` rồi điền ID của sheet vào `SPREADSHEET_ID` (ID là đoạn giữa `/d/` và `/edit` trong địa chỉ sheet).
   *Đã làm ngày 22/11/2026:* sheet **"Belleva – Bridal"** và script **"Belleva Bridal pipeline"** trong Gmail tiệm, đã chạy `setup` và deploy web app. Còn thiếu: SECRET (bước 3) và 2 secret trong Lovable (bước 6).
3. Bên trái chọn **Project Settings (bánh răng) → Script properties → Add script property**
   - Property: `SECRET`
   - Value: một chuỗi bí mật bất kỳ, ví dụ `belleva-bridal-2026-x7k`.
4. Trên thanh công cụ chọn hàm **setup** → **Run** → cho phép quyền truy cập khi Google hỏi. Thao tác này tạo tab "Bridal pipeline", tiêu đề cột, ô chọn trạng thái và màu cảnh báo.
5. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** → copy **Web app URL** (dạng `https://script.google.com/macros/s/…/exec`).
6. Trong Lovable: **Cloud → Secrets**, thêm 2 secret:
   - `BRIDAL_SHEET_WEBHOOK` = Web app URL vừa copy
   - `BRIDAL_SHEET_SECRET` = đúng chuỗi bí mật ở bước 3.

### Các cột trong sheet

| Cột | Ai điền |
|---|---|
| Received, Name, Phone, Wedding date, Would like to come in, Dress colour, The look she wants, Party, Anything else | Tự động từ form |
| Days to wedding | Tự tính |
| **Status** | Team chọn: New → Texted → Trial booked → Trial done → Wedding set booked → Done → Review asked (hoặc Not going ahead) |
| **Tech, Trial date, Wedding set date, Salon notes** | Team điền |

- **Đỏ:** vẫn "New" sau 24 giờ, tức là chưa ai nhắn cho cô dâu.
- **Vàng:** đám cưới còn ≤ 14 ngày mà chưa hẹn wedding set.

## C. Quy trình gợi ý cho team

1. Có email "💍 New bride" → đọc **ngày muốn tới, màu váy, mẫu móng** → chọn thợ có tay nghề hợp với mẫu đó (cột *Tech*) → **nhắn tin trong vòng 2 giờ** để chốt giờ trial, đổi Status sang *Texted*.
2. Hẹn trial → điền *Trial date*, chọn thợ ở cột *Tech*, Status *Trial booked*.
3. Sau trial: chụp ảnh bộ móng chốt (ghi ở *Salon notes* là lưu ở đâu), Status *Trial done*.
4. Hẹn ngày làm set cưới → *Wedding set date*, Status *Wedding set booked*. Khoảng 1 tuần trước thì nhắn nhắc lịch.
5. Làm set xong và trao care kit → *Done*. Sau đám cưới nhắn chúc mừng, xin ảnh và review Google → *Review asked*.

## D. Kiểm tra

Gửi thử một đăng ký ở trang Bridal (ví dụ tên "Test"): email phải tới trong vài giây và sheet có thêm một dòng mới. Sau đó xoá dòng test trong sheet, và xoá bản ghi test trong Lovable (Cloud → Database → `bridal_leads`).
