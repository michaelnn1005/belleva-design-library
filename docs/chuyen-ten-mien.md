# Chuyển bellevanail.com sang web mới mà không mất thứ hạng Google

Tên miền vẫn mua và gia hạn ở **GoDaddy**. Web mới chạy miễn phí trên **Cloudflare**. Email Microsoft 365 của tiệm phải chạy y như cũ.

## Web đã chuẩn bị sẵn những gì (trong code)

| Việc | Vì sao quan trọng |
|---|---|
| Mọi địa chỉ cũ chuyển **301** sang trang mới: `/about/` → `/standard`, `/visit/` → `/contact`, `/blog/…` → trang chủ, `/services/` → `/services`, `/contact/` → `/contact` (`src/lib/redirects.ts`) | 301 báo Google "trang đã dời hẳn sang đây", nên thứ hạng của trang cũ được chuyển sang trang mới |
| `/booking` giữ **đúng địa chỉ cũ**, hiện cùng lịch đặt hẹn ABC Salon (`src/routes/booking.tsx`) | Link trên Google, Instagram và thẻ in vẫn đặt lịch được |
| `www.bellevanail.com` → `bellevanail.com`, bỏ dấu `/` ở cuối địa chỉ, giữ nguyên `utm_…` | Mỗi trang chỉ có một địa chỉ, quảng cáo vẫn được ghi nhận |
| Mỗi trang có **canonical** trỏ về `https://bellevanail.com/...` | Các bản thử (lovable.app, workers.dev) không giành thứ hạng; chúng còn được gắn `noindex` |
| `sitemap.xml` và `robots.txt` | Google tìm thấy hết các trang mới ngay |
| Dữ liệu doanh nghiệp **NailSalon** (tên, địa chỉ, giờ, điện thoại, link đặt lịch) (`src/lib/schema.ts`) | Giúp hiện trong Google Maps và tìm kiếm "nail salon Denton" |
| Tiêu đề trang có "Nail Salon in Denton, TX" | Web cũ không có tiêu đề trang nào |

Kiểm tra tất cả bằng một lệnh: `cd scripts && bun check-urls.ts <địa chỉ web>`

## Bước 1: Dựng thử trên Cloudflare (chưa đụng tên miền)

1. Tạo tài khoản miễn phí ở **dash.cloudflare.com**.
2. **Workers & Pages → Create → Import a repository**, chọn GitHub `belleva-design-library`, nhánh `main`.
   Lệnh build: `bun run build`. Lệnh deploy: `npx wrangler deploy`.
3. **Settings → Variables and Secrets**, tự dán vào (Claude không được tự nhập):
   `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, `BRIDAL_SHEET_SECRET`.
4. Mở địa chỉ thử `….workers.dev`, rồi chạy `bun check-urls.ts https://….workers.dev`. Phải ra **All good**.
5. Thử gửi một form Bridal, kiểm tra email và Google Sheet, rồi xoá dòng thử.

## Bước 2: Chuyển tên miền (khoảng 10 phút, nên làm tối Chủ nhật hoặc lúc vắng khách)

1. Trong Cloudflare: **Add a domain** → `bellevanail.com` → gói **Free**. Cloudflare tự chép các cài đặt từ GoDaddy.
2. **So từng dòng** với bảng bên dưới. Thiếu dòng nào thì thêm vào. Các dòng email và Microsoft để **DNS only (mây xám)**.
3. Trong Worker: **Settings → Domains & Routes → Add custom domain**: thêm `bellevanail.com` và `www.bellevanail.com`.
   Nếu Cloudflare báo trùng với dòng `A @` hay `CNAME www` cũ (trỏ về GoDaddy 160.153.0.128) thì xoá 2 dòng cũ đó.
4. Vào **GoDaddy → My Products → bellevanail.com → DNS → Nameservers → Change → "I'll use my own nameservers"**, dán 2 địa chỉ Cloudflare đưa.
5. Đợi Cloudflare báo **Active**, thường từ vài phút tới vài giờ.
6. Trong `src/lib/marketing.ts`, đổi `SITE_URL` thành `"https://bellevanail.com"` rồi push. Ảnh chia sẻ sẽ lấy từ tên miền chính.

### Các dòng phải còn đủ sau khi chuyển (ghi lại ngày 25/11/2026)

| Loại | Tên | Giá trị | Dùng cho |
|---|---|---|---|
| MX | @ | mx1-usg2.ppe-hosted.com (ưu tiên 0) | Email |
| MX | @ | mx2-usg2.ppe-hosted.com (ưu tiên 0) | Email |
| MX | @ | mx3-usg2.ppe-hosted.com (ưu tiên 0) | Email |
| TXT | @ | `v=spf1 include:_spf-usg2.ppe-hosted.com include:secureserver.net ~all` | Email không bị vào spam |
| TXT | @ | `NETORGFT18060265.onmicrosoft.com` | Microsoft 365 |
| TXT | @ | `google-site-verification=pGPX-tWYgHt3FDdLgVxA72uppAtbluKDJWAYYK4j1ko` | **Google Search Console** |
| TXT | @ | `google-site-verification=KStIr3iHbXmF8ToCHimISiXRot_3tPrxf7MPLlC_0KU` | **Google Search Console** |
| TXT | @ | `pinterest-site-verification=2e4094b3f5a8a9a199659f4ab1fe6a50` | Pinterest |
| TXT | @ | `openai-domain-verification=dv-iwc7WEK4CKTa1HBrAVFEyDjm` | OpenAI |
| TXT | _dmarc | `v=DMARC1; p=none;` | Email |
| CNAME | autodiscover | autodiscover.outlook.com | Outlook tự cài email |
| CNAME | email | email.secureserver.net | Webmail GoDaddy |
| CNAME | lyncdiscover | webdir.online.lync.com | Microsoft 365 |
| CNAME | sip | sipdir.online.lync.com | Microsoft 365 |
| CNAME | msoid | clientconfig.microsoftonline-p.net | Microsoft 365 |
| SRV | _sip._tls | 100 1 443 sipdir.online.lync.com | Microsoft 365 |
| SRV | _sipfederationtls._tcp | 100 1 5061 sipfed.online.lync.com | Microsoft 365 |

Mất 2 dòng `google-site-verification` thì Search Console sẽ mất quyền quản lý web. Mất các dòng MX thì email ngừng nhận.

## Bước 3: Ngay sau khi chuyển (cùng ngày)

1. `cd scripts && bun check-urls.ts https://bellevanail.com`: phải ra **All good**. Lệnh này kiểm tra cả `http://` và `www`.
2. Gửi một email tới email tiệm và trả lời ra ngoài, để chắc email vẫn chạy.
3. **Google Search Console** (search.google.com/search-console):
   - **Sitemaps** → gửi `https://bellevanail.com/sitemap.xml`. Có thể xoá sitemap cũ `wp-sitemap.xml`.
   - **URL Inspection** → lần lượt dán `/`, `/services`, `/booking`, `/bridal`, `/contact` → **Request indexing**.
   - **Không** dùng "Change of address": tên miền vẫn giữ nguyên.
4. **Google Business Profile**: Website = `https://bellevanail.com`, link đặt lịch = `https://bellevanail.com/booking`.
5. **Facebook Sharing Debugger** (developers.facebook.com/tools/debug) → dán `https://bellevanail.com` → **Scrape Again**.

## 2–4 tuần sau

- Search Console → **Pages**: xem có trang nào báo "Not found (404)" không. Có thì báo Claude để thêm chuyển hướng.
- Thứ hạng thường dao động nhẹ 1–3 tuần rồi ổn định. Đừng đổi địa chỉ trang trong thời gian này.
- **Giữ hosting WordPress ở GoDaddy ít nhất 30 ngày** để phòng khi cần quay lại. Sau đó chỉ huỷ **gói hosting**, **không** huỷ tên miền và **không** huỷ email Microsoft 365.

## Nếu cần quay lại web cũ

Vào GoDaddy → Nameservers → **Default**. Trong vòng vài giờ, mọi thứ trở lại như trước khi chuyển.
