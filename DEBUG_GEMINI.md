# 🔧 Hướng Dẫn Debug Gemini API

## ✅ Các Bước Kiểm Tra

### 1. Kiểm Tra API Key
Mở DevTools Console (F12) và xem log:
- ✅ Nếu thấy: `🎯 Starting generateMixedExam for: ...` → API key OK
- ❌ Nếu thấy: `⚠️ GEMINI API KEY NOT FOUND!` → Cần set API key
- ❌ Nếu thấy: `❌ Invalid API key, using fallback exam` → API key không hợp lệ

### 2. Kiểm Tra API Response
Xem console logs:
- `📡 Calling Gemini API...` → Đang gọi API
- `✅ API response received` → API đã trả về
- `📝 Response text length: XXX` → Độ dài response
- `✅ Successfully parsed X questions` → Thành công!

### 3. Nếu Gặp Lỗi
- `❌ Error generating mixed exam: ...` → Xem chi tiết lỗi
- `🔄 Using fallback exam instead` → Đang dùng bài tập dự phòng

## 🔑 Cách Set API Key trên Vercel

1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Settings → Environment Variables
4. Add variable:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: API key của bạn từ https://makersuite.google.com/app/apikey
   - **Environments**: Production, Preview, Development

5. Redeploy project

## 🧪 Test Local

```bash
# Tạo file .env
echo "VITE_GEMINI_API_KEY=your-api-key-here" > .env

# Install dependencies
npm install

# Run dev server
npm run dev
```

## 📊 Timeout Settings

- **Current timeout**: 30 giây
- Nếu API không trả về sau 30s → Tự động dùng fallback exam
- Fallback exam sẽ hiển thị ngay lập tức

## 🐛 Common Issues

### Issue 1: Load mãi không ra
**Nguyên nhân**: API key chưa được set hoặc không hợp lệ
**Giải pháp**: Kiểm tra console log, set API key đúng

### Issue 2: Lỗi 404 Not Found
**Nguyên nhân**: Model name sai hoặc SDK version cũ
**Giải pháp**: 
- ✅ Đã fix: Dùng `gemini-1.5-flash-latest`
- ✅ Đã fix: Update SDK lên v0.21.0

### Issue 3: Timeout
**Nguyên nhân**: API quá chậm hoặc network issue
**Giải pháp**: Tự động fallback sau 30s

## 📝 Expected Console Output (Success)

```
🎯 Starting generateMixedExam for: Bài học ABC
📡 Calling Gemini API...
✅ API response received
📝 Response text length: 5234
✅ Successfully parsed 18 questions
```

## 📝 Expected Console Output (Fallback)

```
🎯 Starting generateMixedExam for: Bài học ABC
❌ Invalid API key, using fallback exam
🔄 Using fallback exam instead
```

## 🚀 Next Steps

1. Commit và push code
2. Vercel sẽ auto-deploy
3. Kiểm tra console logs
4. Nếu thấy "Invalid API key" → Set API key trong Vercel
5. Redeploy
