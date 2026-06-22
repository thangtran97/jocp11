# Java 11 OCP – Luyện Đề Online

## 🌐 Deploy lên GitHub Pages (miễn phí, không bao giờ mất)

### Bước 1 – Tạo tài khoản GitHub
Truy cập https://github.com và đăng ký tài khoản miễn phí nếu chưa có.

### Bước 2 – Tạo repository mới
1. Nhấn **New repository**
2. Đặt tên: `java-11-ocp` (hoặc bất kỳ tên nào)
3. Chọn **Public**
4. Nhấn **Create repository**

### Bước 3 – Upload toàn bộ file lên GitHub
Cách đơn giản nhất (không cần dùng Git):
1. Vào trang repository vừa tạo
2. Nhấn **Add file → Upload files**
3. Kéo thả toàn bộ các file sau vào:
   - `index.html`
   - `quiz-storage.js`
   - `001 Exam 1.html`
   - `001 Exam 1_2.html`
   - `002 Exam 2.html`
   - `002 Exam 2_2.html`
   - `003 Exam 3.html`
   - `003 Exam 3_2.html`
   - `004 Exam 4.html`
   - `004 Exam 4_2.html`
   - `005 Exam 5.html`
   - `005 Exam 5_2.html`
   - `006 Exam 6.html`
   - `006 Exam 6_2.html`
   - `.nojekyll`
4. Nhấn **Commit changes**

### Bước 4 – Bật GitHub Pages
1. Vào **Settings** của repository
2. Chọn **Pages** (menu bên trái)
3. Mục **Source**: chọn **Deploy from a branch**
4. Branch: chọn **main** (hoặc **master**), folder: **/ (root)**
5. Nhấn **Save**

### Bước 5 – Truy cập
Sau ~1 phút, trang web sẽ live tại:
```
https://<username>.github.io/<tên-repo>/
```
Ví dụ: `https://thangth.github.io/java-11-ocp/`

---

## 💾 Về tính năng lưu tiến trình

- Tiến trình được lưu vào **localStorage** của trình duyệt
- **Ưu điểm**: Không cần tài khoản, hoạt động offline
- **Lưu ý**: Dữ liệu lưu theo trình duyệt + domain
  - Nếu truy cập qua GitHub Pages → lưu trên GitHub Pages URL
  - Nếu mở file local → lưu riêng trên local
  - Dùng cùng URL trên các máy khác nhau → **KHÔNG chia sẻ** localStorage
  
## 🔄 Muốn đồng bộ giữa các máy?

Vì localStorage là local, nếu muốn dùng nhiều máy với cùng tiến trình, có thể:
1. **Dùng cùng một máy** – đơn giản nhất
2. **Export/Import tiến trình** (tính năng có thể thêm sau)
3. Dùng dịch vụ có backend như **Netlify + Supabase** (miễn phí tier) – phức tạp hơn

---

## 📁 Cấu trúc file
```
java-11-ocp/
├── index.html          ← Trang chủ, menu điều hướng + % hoàn thành
├── quiz-storage.js     ← Thư viện lưu/load localStorage
├── .nojekyll           ← Cần thiết cho GitHub Pages
├── 001 Exam 1.html
├── 001 Exam 1_2.html
├── 002 Exam 2.html
...
└── 006 Exam 6_2.html
```

