# Momo Review - Cộng đồng đánh giá sản phẩm mẹ & bé

Momo Review là một ứng dụng Web Đa Trang (Multi-page Application) hiện đại, được xây dựng với mục tiêu cung cấp những đánh giá chân thực nhất về các sản phẩm dành cho mẹ và bé (như bỉm, sữa, đồ chơi giáo dục). Giao diện được thiết kế với phong cách Glassmorphism, tone màu pastel nhẹ nhàng, rực rỡ mang đến cảm giác thoải mái và cao cấp.

## Công nghệ sử dụng

- **Khung ứng dụng (Framework):** React (18.x) + TypeScript
- **Trình đóng gói (Bundler):** Vite
- **Định tuyến (Routing):** React Router DOM v6
- **Biểu tượng (Icons):** Lucide React
- **CSS:** Vanilla CSS (CSS thuần) tích hợp CSS Variables & Keyframes Animations

## Tính năng nổi bật

- **Routing mượt mà:** Điều hướng giữa các trang (Trang chủ, Bỉm, Sữa, Đồ chơi) không cần tải lại toàn bộ trang.
- **Hoạt ảnh bắt mắt:**
  - Hiệu ứng `Fade In Scale` khi chuyển trang.
  - Các khối Card đánh giá có hiệu ứng nổi (Glow Effect) khi di chuột qua.
  - Navbar thông minh (Glassmorphism): Tự động mờ và đổ bóng khi người dùng cuộn trang.
- **Tương thích mọi thiết bị (Responsive):** Giao diện tương thích cực tốt với thiết bị di động.

## Hướng dẫn cài đặt và chạy trên máy cá nhân

Yêu cầu cần có: Node.js (phiên bản 18+ khuyến nghị).

### 1. Cài đặt các gói phụ thuộc

Di chuyển vào thư mục dự án và chạy:

```bash
npm install
```

### 2. Khởi động môi trường phát triển (Development Server)

```bash
npm run dev
```

Sau đó, truy cập vào đường dẫn `http://localhost:5173` trên trình duyệt để trải nghiệm ứng dụng.

### 3. Đóng gói để triển khai (Production Build)

```bash
npm run build
```

Mã nguồn sau khi được tối ưu sẽ nằm trong thư mục `dist`.

## Cấu trúc thư mục chính

```text
momo/
├── public/              # Chứa các tài nguyên tĩnh không qua bundler
├── src/
│   ├── components/      # Các thành phần giao diện tái sử dụng (Navbar, Footer, Hero, ReviewCard, Categories)
│   ├── pages/           # Các trang chính của ứng dụng (Home, Diapers, Milk, Toys)
│   ├── App.tsx          # Điểm nối chính chứa cấu hình Routing
│   ├── index.css        # Khai báo biến CSS toàn cục và các lớp tiện ích (Glassmorphism, Animations)
│   └── main.tsx         # File khởi chạy React App
└── README.md            # Tài liệu dự án
```

## Bản quyền
© 2026 Momo Review. All rights reserved.
