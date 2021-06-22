## Docker 创建网络
```bash
docker network create nextjs-blog
```

## Docker 安装运行 PostgreSQL
```bash
docker run -d \
  --network nextjs-blog --network-alias postgres \
  -p 5432:5432 \
  -v blog-database:/var/lib/postgres \
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

## 程序 Docker 化
```bash
docker build . -t <your username>/nextjs-blog
```

## Docker 运行程序
```bash
docker run -dp 3000:3000 \
  --network nextjs-blog \
  <your username>/nextjs-blog
```