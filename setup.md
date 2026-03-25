# 🐳 BaiTap Docker - Hướng Dẫn Setup & Chạy

---

## 📋 Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [BaiTap 1 - Node.js Single Container](#baitap-1-single-container)
3. [BaiTap 2 - Frontend + Backend](#baitap-2-frontend--backend)
4. [Kiểm Tra Kết Quả](#kiểm-tra-kết-quả)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Yêu Cầu Hệ Thống

- **Docker Desktop** (Windows/Mac) hoặc **Docker + Docker Compose** (Linux)
- **Cổng 3000 & 4000 & 8080** khả dụng

### Cài Đặt

**Windows/Mac:**
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Cài đặt và khởi động

**Linux:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

---

## 🟢 BaiTap 1: Single Container

### Mô tả
- **Loại**: Node.js app đơn
- **Dockerfile**: Build từ `Dockerfile`
- **Port**: 3000
- **API**: `http://localhost:3000`

### Cách 1: Build & Run từ Dockerfile

```bash
cd bai-tap-1

# Build image
docker build -t baitap1-app .

# Run container
docker run -d \
  --name baitap1-container \
  -p 3000:3000 \
  baitap1-app

# Kiểm tra logs
docker logs baitap1-container
```

### Cách 2: Pull từ Docker Hub

```bash
# Pull image
docker pull pcvinhx/baitap1-app

# Run
docker run -d \
  --name baitap1-container \
  -p 3000:3000 \
  pcvinhx/baitap1-app
```

### Dừng Container

```bash
docker stop baitap1-container
docker rm baitap1-container
```

---

## 🟠 BaiTap 2: Frontend + Backend (Docker Compose)

### Mô tả
- **Backend**: Node.js (port 4000)
- **Frontend**: Nginx + HTML (port 8080)
- **Network**: Internal Docker network
- **Orchestration**: Docker Compose

### Cách 1: Chạy với Docker Compose (Khuyến recommend)

```bash
cd bai-tap-2

# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop + Remove volumes
docker compose down -v
```

### Cách 2: Chỉ Build Backend

```bash
cd bai-tap-2/backend

# Build
docker build -t bai-tap-2-backend .

# Run
docker run -d \
  --name baitap2-backend \
  -p 4000:4000 \
  -e NODE_ENV=production \
  bai-tap-2-backend
```

### Cách 3: Pull Backend từ Docker Hub

```bash
# Pull + Run
docker run -d \
  --name baitap2-backend \
  -p 4000:4000 \
  pcvinhx/bai-tap-2-backend
```

### File docker-compose.yml Details

```yaml
services:
  backend:
    image: pcvinhx/bai-tap-2-backend  # Từ Docker Hub
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000

  frontend:
    image: nginx:alpine               # Official Nginx image
    ports:
      - "8080:80"
    volumes:
      - ./frontend:/usr/share/nginx/html:ro  # Mount HTML
    depends_on:
      - backend
```

---

## 🧪 Kiểm Tra Kết Quả

### BaiTap 1
```bash
# Terminal/CMD
curl http://localhost:3000

# Browser
http://localhost:3000
```

### BaiTap 2 - Backend
```bash
curl http://localhost:4000

# Response:
# {
#   "message": "🚀 Hello từ Backend Node.js!",
#   "status": "OK",
#   "timestamp": "2026-03-26T...",
#   "environment": "production"
# }
```

### BaiTap 2 - Frontend
```bash
# Browser
http://localhost:8080
```

---

## 📊 View Containers & Images

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View images
docker images

# Docker Compose status
cd bai-tap-2
docker compose ps
```

---

## 🔧 Troubleshooting

### ❌ Lỗi: "Port 4000 already in use"

```bash
# Tìm process dùng port
netstat -ano | findstr :4000  # Windows
lsof -i :4000                  # Mac/Linux

# Kill process (Windows)
taskkill /PID <PID> /F

# Hoặc dùng port khác
docker run -p 4001:4000 pcvinhx/bai-tap-2-backend
```

### ❌ Lỗi: "Cannot connect to Docker daemon"

```bash
# Windows/Mac: Khởi động Docker Desktop
# Linux: 
sudo systemctl start docker
```

### ❌ Lỗi: "Image not found"

```bash
# Pull image từ Docker Hub
docker pull pcvinhx/bai-tap-2-backend

# Hoặc build locally
cd bai-tap-2
docker compose build --no-cache
docker compose up -d
```

### ❌ Lỗi: "frontend folder not found"

Đảm bảo thư mục `bai-tap-2/frontend/` tồn tại với `index.html`

```bash
# Tạo quick test HTML
echo "<h1>Hello from Nginx</h1>" > bai-tap-2/frontend/index.html
```

### ❌ Container chạy nhưng không respond

```bash
# Check logs
docker compose logs backend
docker compose logs frontend

# Restart
docker compose restart
```

---

## 📦 Sharing Projects

### Cách 1: Docker Hub Images
- Backend: `pcvinhx/bai-tap-2-backend`
- Share `docker-compose.yml` + `frontend/` folder

### Cách 2: GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Cách 3: Zip file
```bash
zip -r bai-tap.zip bai-tap-1/ bai-tap-2/
```

---

## 📝 Useful Commands

```bash
# View container logs (real-time)
docker logs -f <container-name>

# Execute command in container
docker exec -it <container-name> bash

# View container details
docker inspect <container-name>

# Clean up unused images
docker image prune

# Remove all containers
docker container prune

# Docker Compose rebuild
docker compose up -d --build
```

---

## 🎯 Quick Start

### Chạy BaiTap 1 ngay
```bash
docker run -d -p 3000:3000 pcvinhx/baitap1-app
# http://localhost:3000
```

### Chạy BaiTap 2 ngay
```bash
cd bai-tap-2
docker compose up -d
# Frontend: http://localhost:8080
# Backend: http://localhost:4000
```

---

## 📚 Học Thêm

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Nginx Docker](https://hub.docker.com/_/nginx)

---

**Cập nhật:** 2026-03-26  
**Author:** pcvinhx  
**Version:** 1.0
