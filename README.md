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
docker run -d --network blog --network-alias postgres -p 5432:5432 -v blog-db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=123456 postgres:13.3
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
docker run -d --network blog --network-alias next -p 3000:3000 <your username>/nextjs-blog
```

## Docker 运行 Nginx
在 /home/cheng 下创建 nginx.conf 文件
```nginx configuration
server {
    listen 8080;
    listen [::]:8080;

    server_name localhost;
    
    location ~ ^/_next/static/ {
        root /usr/share/nginx/html/;
        expires 30d;
    }

    location / {
        proxy_pass http://next:3000;
    }
    
    gzip on;
    gzip_min_length  500;
    gzip_proxied     any;
    gzip_comp_level 4;
    gzip_types  text/css text/javascript text/xml text/plain text/x-component application/javascript application/json application/xml application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
    gzip_vary on;
    gzip_disable     "msie6";
}
```
拷贝静态文件到 Nginx 挂载的目录
```shell
docker cp <nextjs-blog-container-id>:"/app/.next/static" "/home/cheng/app/.next/"
```
然后运行 Nginx 容器：
```shell
docker run -d --network blog -p 80:8080 -v /home/cheng/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/cheng/app/.next/static/:/usr/share/nginx/html/_next/static/ nginx:1.20.1
```