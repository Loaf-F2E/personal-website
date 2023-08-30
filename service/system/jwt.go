package system

import (
	"context"
	"personal-website/global"
	"time"
)

type JwtService struct{}

func (jwtService *JwtService) GetRedisJWT(uid string) (redisJWT string, err error) {
	redisJWT, err = global.REDIS.Get(context.Background(), "jwt_merchant_"+uid).Result()
	return redisJWT, err
}

func (jwtService *JwtService) SetRedisJWT(jwt string, uid string) (err error) {
	timer := time.Duration(global.CONFIG.JWT.ExpiresTime) * time.Second
	err = global.REDIS.Set(context.Background(), "jwt_user_"+uid, jwt, timer).Err()
	return err
}
