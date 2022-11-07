export const HTTP_STATUS = {
  SUCCESS: 200, // 服务器已成功处理了请求
  CREATED: 201, // 请求成功并且服务器创建了新的资源
  ACCEPTED: 202, // 服务器已接受请求，但尚未处理
  LESS_AUTH: 241, // 缺少权限
  MULTIPLE_CHOICES: 300,
  NOT_MODIFIED: 304, // （未修改） 自从上次请求后，请求的网页未修改过
  CLIENT_ERROR: 400, // （错误请求） 服务器不理解请求的语法
  AUTHENTICATE: 401, // （未授权） 请求要求身份验证
  FORBIDDEN: 403, // （禁止） 服务器拒绝请求
  NOT_FOUND: 404,
  UNPROCESSABLE_CONTENT: 422, // 无法处理的内容
  TOO_QUICK: 429, // 请求太快
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503, // 服务不可用） 服务器目前无法使用（由于超载或停机维护）
  GATEWAY_TIMEOUT: 504, // （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求
};
