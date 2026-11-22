# Chạy quảng cáo: đo lường và ảnh chia sẻ

Website đã sẵn sàng cho quảng cáo. Còn thiếu **2 mã ID** do bạn tạo. Khi có mã, dán vào `src/lib/marketing.ts` (hoặc gửi cho Claude). Khi chưa có mã thì không có gì được tải hay gửi đi, website chạy y như cũ.

## Website tự ghi nhận những gì

| Hành động của khách | Google Analytics 4 | Meta (Facebook/Instagram) |
|---|---|---|
| Bấm nút **Book** (bất kỳ đâu trên web) | `book_click` | `Schedule` |
| Bấm **Text** / nhắn tin | `text_click` | `Contact` |
| Bấm **gọi điện** | `call_click` | `Contact` |
| Bấm **Get directions** | `directions_click` | `FindLocation` |
| Gửi **form Bridal** thành công | `generate_lead` | `Lead` |
| Xem trang | tự động | `PageView` |

**Giữ nguồn quảng cáo:** khách vào web từ quảng cáo (có `utm_…`, `fbclid`, `gclid`) rồi bấm Book, thì link sang bellevanail.com/booking sẽ mang theo nguồn đó. Mã riêng của từng trang (ví dụ `WEB26BRD`) được chuyển sang `utm_content`, nên tiệm vẫn biết khách đặt từ trang nào.

> Lưu ý: việc đặt lịch hoàn tất diễn ra trên bellevanail.com (hệ thống booking riêng), nên website đo được tới bước **bấm Book**. Muốn đo cả **đặt lịch thành công**, cần hỏi bên cung cấp hệ thống booking xem có cho gắn Meta Pixel / Google tag vào trang xác nhận không.

---

## A. Google Analytics 4 (khoảng 5 phút)

1. Vào **analytics.google.com**, đăng nhập bằng Gmail của tiệm → **Start measuring**.
2. Account name: `Belleva Nails` → Property name: `Belleva website`, múi giờ **Central (Chicago)**, tiền tệ **USD**.
3. Chọn nền tảng **Web**. Website URL là địa chỉ web của tiệm, Stream name: `Website`.
4. Copy **Measurement ID** (dạng `G-AB12CD34EF`).
5. Sau khi web có mã và đã có vài lượt bấm: **Admin → Events**, bật **Mark as key event** cho `book_click`, `generate_lead`, `text_click`, `call_click`.
6. Nếu chạy Google Ads: **Admin → Product links → Google Ads links**, liên kết tài khoản Ads, rồi nhập các key event ở trên làm conversion.

## B. Meta Pixel (khoảng 5 phút)

1. Vào **business.facebook.com → Events Manager** (dùng Business của trang Belleva).
2. **Connect data sources → Web → Meta Pixel** → đặt tên `Belleva website`.
3. Chọn cách cài **thủ công**, copy **Pixel ID** (dãy khoảng 15–16 chữ số).
4. Khi tạo quảng cáo, chọn mục tiêu **Leads** hoặc **Sales**, sự kiện tối ưu là **Schedule** (bấm Book) hoặc **Lead** (Bridal).
5. (Nên làm) **Events Manager → Settings → Domain** và xác minh tên miền của web.

## C. Dán mã vào website

Trong `src/lib/marketing.ts`:

```ts
export const GA4_ID = "G-AB12CD34EF";
export const META_PIXEL_ID = "123456789012345";
```

Nếu web dùng tên miền riêng (không phải `belleva-design-library.lovable.app`), sửa thêm `SITE_URL` cho đúng, để ảnh chia sẻ hiện đúng.

## D. Đặt link quảng cáo

- **Facebook/Instagram:** Meta tự thêm `fbclid`. Nên thêm vào ô *URL parameters*:
  `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`
- **Google Ads:** bật **Auto-tagging** (tự thêm `gclid`).
- **TikTok, bài đăng thường, bio Instagram:** dùng link có `utm_source=tiktok` / `instagram`, `utm_medium=social`, `utm_campaign=<tên đợt>`.
- Quảng cáo bridal nên dẫn thẳng tới `/bridal`, còn quảng cáo mẫu móng thì dẫn tới trang chủ.

## E. Kiểm tra sau khi gắn mã

1. **Meta:** cài tiện ích Chrome *Meta Pixel Helper*, mở web, bấm Book → phải thấy `PageView` và `Schedule`. Hoặc dùng **Events Manager → Test events**.
2. **Google:** **Admin → DebugView**, hoặc **Reports → Realtime**: mở web trên điện thoại, bấm Book → thấy `book_click` trong vài giây.
3. **Ảnh chia sẻ:** dán link web vào **developers.facebook.com/tools/debug** → **Scrape Again** → phải hiện ảnh Belleva.

## Ảnh chia sẻ (khi dán link vào Facebook, Instagram, tin nhắn)

Các file nằm trong `public/share/`:
- `home.jpg`: trang chủ, và mặc định cho các trang khác.
- `bridal.jpg`: trang Bridal.
- `services.jpg`: trang Services.

Muốn đổi ảnh hoặc chữ: sửa `scripts/make-share-images.ts` rồi chạy `cd scripts && bun make-share-images.ts`.

## Quyền riêng tư

Khi bật Google Analytics và Meta Pixel, nên thêm một dòng vào chính sách quyền riêng tư của tiệm: website dùng cookie của Google và Meta để đo lường và quảng cáo.
