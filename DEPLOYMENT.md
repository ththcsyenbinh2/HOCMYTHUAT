# Deployment Guide - Vercel

Hướng dẫn chi tiết deploy ứng dụng Mỹ Thuật THCS lên Vercel.

## Bước 1: Chuẩn Bị

### 1.1. Tạo Tài Khoản Cần Thiết

- [x] Tài khoản GitHub
- [x] Tài khoản Vercel (https://vercel.com)
- [x] Tài khoản Supabase (https://supabase.com)
- [x] Google Gemini API Key (https://makersuite.google.com/app/apikey)

### 1.2. Thiết Lập Supabase

1. Đăng nhập vào Supabase Dashboard
2. Tạo project mới:
   - Project name: `art-education-app`
   - Database password: Lưu lại để sử dụng
   - Region: Chọn gần Việt Nam nhất (Singapore)

3. Chạy Database Schema:
   - Vào **SQL Editor** trong Supabase
   - Copy toàn bộ nội dung file `supabase/schema.sql`
   - Paste vào editor và click **Run**

4. Lấy API Credentials:
   - Vào **Settings** → **API**
   - Copy `Project URL` (VITE_SUPABASE_URL)
   - Copy `anon public` key (VITE_SUPABASE_ANON_KEY)

## Bước 2: Push Code lên GitHub

```bash
# Initialize git (nếu chưa có)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Art Education App"

# Create repository trên GitHub và link
git remote add origin https://github.com/YOUR_USERNAME/art-education-app.git

# Push
git branch -M main
git push -u origin main
```

## Bước 3: Deploy lên Vercel

### 3.1. Import Project

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import repository từ GitHub:
   - Chọn repository `art-education-app`
   - Click **Import**

### 3.2. Configure Project

1. **Framework Preset**: Vercel sẽ tự detect là Vite
2. **Root Directory**: `.` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `dist` (default)

### 3.3. Environment Variables

Click **Environment Variables** và thêm:

| Name | Value | Source |
|------|-------|--------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Settings → API |
| `VITE_GEMINI_API_KEY` | `AIzaSy...` | Google AI Studio |

**Lưu ý**: Đảm bảo chọn **Production**, **Preview**, và **Development** cho tất cả variables.

### 3.4. Deploy

1. Click **Deploy**
2. Đợi 2-3 phút để Vercel build và deploy
3. Sau khi hoàn thành, bạn sẽ nhận được URL: `https://your-app.vercel.app`

## Bước 4: Kiểm Tra Deployment

### 4.1. Test Student Flow

1. Truy cập URL của app
2. Click **Học Sinh**
3. Nhập tên và chọn lớp
4. Chọn chủ đề → Chọn bài học → Chọn loại bài tập
5. Làm bài và kiểm tra kết quả

### 4.2. Test Teacher Flow

1. Click **Giáo Viên**
2. Đăng nhập:
   - Email: `teacher@example.com`
   - Password: `teacher123`
3. Kiểm tra dashboard và kết quả học sinh

### 4.3. Test Database Connection

1. Làm vài bài tập với tài khoản học sinh
2. Đăng nhập giáo viên và kiểm tra kết quả có hiển thị
3. Vào Supabase → **Table Editor** → `exercise_results` để xem dữ liệu

## Bước 5: Custom Domain (Optional)

### 5.1. Thêm Domain

1. Trong Vercel project, vào **Settings** → **Domains**
2. Nhập domain của bạn (ví dụ: `mythuat.edu.vn`)
3. Click **Add**

### 5.2. Configure DNS

Vercel sẽ cung cấp DNS records. Thêm vào DNS provider của bạn:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Bước 6: Continuous Deployment

Sau khi setup xong, mỗi khi bạn push code mới lên GitHub:

```bash
git add .
git commit -m "Update features"
git push
```

Vercel sẽ tự động:
1. Detect changes
2. Build lại app
3. Deploy version mới
4. Cập nhật URL

## Troubleshooting

### Lỗi Build Failed

**Nguyên nhân**: Missing dependencies hoặc TypeScript errors

**Giải pháp**:
```bash
# Test build locally
npm run build

# Fix any errors
# Push lại code
```

### Lỗi Environment Variables

**Nguyên nhân**: Thiếu hoặc sai environment variables

**Giải pháp**:
1. Vào Vercel → Settings → Environment Variables
2. Kiểm tra lại tất cả variables
3. Redeploy: Deployments → ... → Redeploy

### Lỗi Supabase Connection

**Nguyên nhân**: Sai URL hoặc API key

**Giải pháp**:
1. Kiểm tra lại Supabase credentials
2. Đảm bảo RLS policies đã được enable
3. Check Supabase logs: Logs → API Logs

### Lỗi Gemini API

**Nguyên nhân**: Sai API key hoặc hết quota

**Giải pháp**:
1. Kiểm tra API key tại Google AI Studio
2. Kiểm tra usage limits
3. App có fallback exercises nếu AI fails

## Monitoring & Analytics

### Vercel Analytics

1. Vào project → **Analytics**
2. Xem:
   - Page views
   - Unique visitors
   - Performance metrics

### Supabase Monitoring

1. Vào Supabase → **Database**
2. Xem:
   - Table sizes
   - Query performance
   - API usage

## Backup & Maintenance

### Database Backup

1. Vào Supabase → **Database** → **Backups**
2. Enable automatic backups
3. Download manual backup nếu cần

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test
npm run dev
npm run build

# Push
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## Support

Nếu gặp vấn đề:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Check browser console for errors
4. Review README.md và documentation

---

**Chúc bạn deploy thành công! 🚀**
