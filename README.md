## Docker 安装 PostgreSQL
```shell
docker run --name blogdb -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres
```

## 创建数据库
```shell
docker exec -it blogdb bash
psql -U postgres
CREATE DATABASE test;
```

## 运行项目
```shell
cd project
yarn install
yarn dev
```