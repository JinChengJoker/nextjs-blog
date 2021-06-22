## Docker 创建 Volume
```shell
docker volume create blog-db
```

## Docker 创建网络
```bash
docker network create blog
```

## Docker 安装运行 PostgreSQL
需要使用 root 权限！否则无法访问 docker volume！
```bash
docker run -d \
  --network blog --network-alias postgres \
  -p 5432:5432 \
  -v blog-db:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123456 \
  postgres:13.3
```

## 创建数据库
```bash
docker exec -it <postgres-container-id> bash
psql -U postgres
CREATE DATABASE blog;
```

## 开发项目
```bash
cd project
yarn install
yarn dev
```

## 确保在同一网络
```shell
docker run -it --network blog nicolaka/netshoot
dig postgres
```

## 程序 Docker 化
```bash
cd project
docker build --network blog . -t <your username>/nextjs-blog
```

## Docker 运行程序
```bash
docker run -dp 8080:8080 \
  --network blog --network-alias next \
  <your username>/nextjs-blog
```