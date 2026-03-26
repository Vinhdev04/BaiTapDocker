# chay dockerfile:
# build image
docker build -t pcvinhx/duanjava:latest .
# push len Docker Hub (dang nhap docker hub ```docker login``` truoc)
docker push pcvinhx/duanjava:latest
# chay
docker run -d -p 8080:8080 pcvinhx/duanjava:latest
# dung
docker stop <id>