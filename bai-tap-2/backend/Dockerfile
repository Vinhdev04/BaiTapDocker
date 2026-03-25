# Sử dụng Node.js Alpine (nhẹ, bảo mật)
FROM node:18-alpine

# Metadata
LABEL maintainer="HUTECH Student"
LABEL description="Backend service for BaiTap2"

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy source code
COPY server.js .

# Khai báo biến môi trường
ENV NODE_ENV=production
ENV PORT=4000

# Mở cổng 4000
EXPOSE 4000

# Lệnh khởi động
CMD ["node", "server.js"]