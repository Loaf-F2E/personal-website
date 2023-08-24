# personal-website

## technology stack(技术栈)

go + gin + mysql
## docker 

docker-compose.yml  通过docker-compose创建数据库镜像，运行`docker-compose up -d`
如果连接的是服务器上的数据库，则需要在服务器上创建数据库。命令可参考

## 功能

### 个人博客功能

## constants
### System role(系统角色)

| role(角色)    | permissions(权限)      |
| ------------- | ---------------------- |
| admin(管理员) | administrator(管理员)  |
| user(用户)    | write&read(读和写评论) |
| visitor(访客) | read(只读)             |

### status (状态)

```ts
export enum status {
  Fail = 0, // 失效
  Effective = 1, // 有效
  Deleted = 2, // 删除
}
```

## Entity

### user (用户)

| params       | description     |
| ----------   | --------------- |
| user_id      | 自增id           |
| account      | 账号             |
| password     | 密码             |
| email        | 邮箱             |
| role         | 用户角色          |
| user_status  | 状态             |
### articles (帖子)

| params     | description     |
| ---------- | --------------- |
| article_id | 自增id           |
| tags        | 关联Tag         |
| user        | 关联User        |
| title      | 标题            |
| content    | markdown 内容   |
| status    |  状态   |
| createTime | 创建时间        |
| updateTime | 更新时间        |

### tags (标签)

| params | description |
| ------ | ----------- |
| name   | 标签名称    |
| color  | 标签颜色    |
| tag_status  | 状态    |
| count  | 被引用次数    |
| user   | 关联User        |
| articles | 关联Article   |


## 会议纪要 Minutes of meeting

1. 2022.05.21

确定 0.0.1 要做的功能，用户管理、用户登录、博客功能

用户管理、
pinia 用户登录

博客功能
markdown(锚点)
