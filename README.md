# Mỹ Thuật THCS - Ứng Dụng Học Tập AI

Ứng dụng web chuyên nghiệp cho giáo dục Mỹ thuật THCS (lớp 6-9) theo chương trình **Kết nối tri thức với cuộc sống**, tích hợp AI tạo bài tập tự động và quản lý kết quả học sinh.

## ✨ Tính Năng Chính

### Dành cho Học Sinh
- 📚 **Chương trình đầy đủ**: 35+ chủ đề cho lớp 6-9
- 🎨 **Học tập đa dạng**: Mỗi chủ đề có 2 loại bài học
- 🤖 **Bài tập AI**: 5 loại bài tập được tạo tự động:
  - Trắc nghiệm
  - Kéo thả
  - Ghép đôi
  - Sắp xếp thứ tự
  - Chọn hình theo ý chính
- ✅ **Đánh giá tức thì**: Kết quả và điểm số ngay lập tức
- 📊 **Theo dõi tiến độ**: Lưu trữ toàn bộ kết quả

### Dành cho Giáo Viên
- 👥 **Quản lý học sinh**: Xem danh sách và kết quả
- 📈 **Thống kê chi tiết**: Điểm trung bình, số bài làm
- 🔍 **Lọc và tìm kiếm**: Theo lớp, học sinh, chủ đề
- 📥 **Xuất dữ liệu**: Export kết quả ra file CSV

## 🛠 Công Nghệ Sử Dụng

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS với design system hiện đại
- **Routing**: React Router v6
- **AI**: Google Gemini API
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📋 Yêu Cầu Hệ Thống

- Node.js 18+ và npm
- Tài khoản Supabase
- Google Gemini API key

## 🚀 Cài Đặt và Chạy

### 1. Clone Repository

```bash
git clone <repository-url>
cd holographic-filament
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Cấu Hình Environment Variables

Tạo file `.env` từ template:

```bash
cp .env.example .env
```

Điền các giá trị vào file `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Thiết Lập Supabase Database

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Tạo project mới hoặc chọn project hiện có
3. Vào **SQL Editor**
4. Copy nội dung file `supabase/schema.sql` và chạy

### 5. Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### 6. Build cho Production

```bash
npm run build
```

## 📦 Deploy lên Vercel

### Bước 1: Push Code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Đăng nhập vào [Vercel](https://vercel.com)
2. Click **New Project**
3. Import repository từ GitHub
4. Cấu hình Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
5. Click **Deploy**

## 🎓 Hướng Dẫn Sử Dụng

### Học Sinh

1. Truy cập trang chủ và chọn **Học Sinh**
2. Nhập họ tên và chọn lớp
3. Chọn chủ đề muốn học
4. Chọn loại bài học (2 loại/chủ đề)
5. Chọn loại bài tập (5 loại)
6. Làm bài và nộp
7. Xem kết quả và điểm số

### Giáo Viên

1. Truy cập trang chủ và chọn **Giáo Viên**
2. Đăng nhập (mặc định: `teacher@example.com` / `teacher123`)
3. Xem thống kê tổng quan
4. Lọc kết quả theo lớp/học sinh/chủ đề
5. Xuất dữ liệu ra CSV

## 📚 Cấu Trúc Dự Án

```
holographic-filament/
├── src/
│   ├── components/        # UI components
│   │   └── UI/           # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── data/             # Curriculum data
│   ├── lib/              # External libraries (Supabase, Gemini)
│   ├── pages/            # Page components
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── supabase/
│   └── schema.sql        # Database schema
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
└── README.md             # This file
```

## 🎨 Design System

Ứng dụng sử dụng design system hiện đại với:

- **Colors**: Gradient primary/secondary, semantic colors
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Glassmorphism effects, smooth animations
- **Responsive**: Mobile-first design

## 🔒 Bảo Mật

- Row Level Security (RLS) trên Supabase
- Environment variables cho sensitive data
- Client-side validation
- Secure API calls

## 🐛 Troubleshooting

### Lỗi kết nối Supabase
- Kiểm tra `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`
- Đảm bảo đã chạy schema.sql trong Supabase

### Lỗi Gemini API
- Kiểm tra `VITE_GEMINI_API_KEY`
- Đảm bảo API key còn hạn sử dụng
- Ứng dụng có fallback exercises nếu AI fails

### Build errors
- Xóa `node_modules` và chạy `npm install` lại
- Kiểm tra phiên bản Node.js (cần 18+)

## 📝 License

MIT License

## 👨‍💻 Phát Triển

Developed with ❤️ for Vietnamese education
