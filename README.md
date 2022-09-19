# personal-website

## technology stack(技术栈)

nest
## docker 

docker-compose.yml  通过docker-compose创建数据库镜像，运行`docker-compose up -d`
如果连接的是服务器上的数据库，则需要在服务器上创建数据库。命令可参考

`$HOME/docker/volumes/postgres:/var/lib/postgresql/data`的意思是将容器中的 /var/lib/postgresql/data 目录挂载至磁盘上的 $HOME/docker/volumes/postgres ，以便数据的持久化。因为 docker container 对于改动只是暂存的，所以如果我们的 container 挂掉了，那么我们数据库中存储的数据就全无了

```sh
docker run -it -d --rm --name postgresql -e POSTGRES_USER=yourusername -e POSTGRES_DB=yourdbname  -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
```

```sh

# 数据卷可以在容器之间共享和重用， 默认会一直存在，即使容器被删除（docker volume inspect pgdata可查看数据卷的本地位置，验证持久数据目录）

$ docker volume create pgdata

$ docker volume inspect pgdata

docker run --name postgres --restart always -e POSTGRES_USER='postgres' -e POSTGRES_PASSWORD='123456' -e ALLOW_IP_RANGE=0.0.0.0/0 -v pgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres

# -e ALLOW_IP_RANGE=0.0.0.0/0，这个表示允许所有ip访问，如果不加，则非本机 ip 访问不了
# -e POSTGRES_USER=abcuser 用户名
# -e POSTGRES_PASS=‘abc123’ 指定密码
```

.env文件例子
``` 
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=123456
DATABASE_NAME=personal_website
JWT_SECRET=test
```
## 功能

### 个人博客功能

#### System role(系统角色)

| role(角色)    | permissions(权限)      |
| ------------- | ---------------------- |
| admin(管理员) | administrator(管理员)  |
| user(用户)    | write&read(读和写评论) |
| visitor(访客) | read(只读)             |

#### blog (帖子)

| params     | description     |
| ---------- | --------------- |
| tag        | 可根据 tag 分类 |
| title      | 标题            |
| content    | markdown 内容   |
| createTime | 创建时间        |
| updateTime | 更新时间        |
| author     | 作者            |

## 会议纪要 Minutes of meeting

1. 2022.05.21

确定 0.0.1 要做的功能，用户管理、用户登录、博客功能

用户管理、
pinia 用户登录

博客功能
markdown(锚点)
