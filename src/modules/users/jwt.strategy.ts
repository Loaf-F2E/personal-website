import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

// 服务端根据jwt字符串的内容 找到用户信息  @Req() request: Request request.user
// http header中添加
// Authorization: Bearer <token>
@Injectable()
export class JwtStrateagy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // fromHeader： 在Http 请求头中查找JWT
      // fromBodyField: 在请求的Body字段中查找JWT
      // fromAuthHeaderAsBearerToken：在授权标头带有Bearer方案中查找JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_SECRET}`,
    } as StrategyOptions);
  }

  async validate(payload: any) {
    console.log('jwt payload: ', payload);
    return {
      userId: payload.sub,
      account: payload.account,
      role: payload.role,
    };
  }
}
