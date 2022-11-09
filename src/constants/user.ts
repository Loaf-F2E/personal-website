export enum roleType {
  Admin = 0, // 管理员
  User = 1, // 用户
  visitor = 2, // 游客
}

export enum status {
  Fail = 0, // 失效
  Effective = 1, // 有效
  Deleted = 2, // 删除
}

export interface userInfo {
  userId?: number;
  account?: string;
  role?: number;
}
