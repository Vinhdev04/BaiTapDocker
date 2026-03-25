# ── Bước 1: Chọn base image (móng nhà) ──
FROM node:18-alpine

# ── Bước 2: Thiết lập thư mục làm việc trong container ──
WORKDIR /app

# ── Bước 3: Copy mã nguồn vào container ──
COPY app.js .

# ── Bước 4: Khai báo cổng ứng dụng sẽ lắng nghe ──
EXPOSE 3000

# ── Bước 5: Lệnh chạy khi container khởi động ──
CMD ["node", "app.js"]