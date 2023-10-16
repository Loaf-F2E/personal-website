package initialize

import (
	"context"
	"fmt"
	"personal-website/global"

	"github.com/go-redis/redis/v8"
)

func Redis() {
	redisConfig := global.CONFIG.Redis
	fmt.Printf("redisConfig:\nAddr: %v\nDb: %v\n", redisConfig.Addr, redisConfig.DB)
	client := redis.NewClient(&redis.Options{
		Addr:     redisConfig.Addr,
		Password: redisConfig.Password,
		DB:       redisConfig.DB,
	})
	pong, err := client.Ping(context.Background()).Result()
	if err != nil {
		fmt.Println("redis Error:", err)
	} else {
		fmt.Println("redis success")
		fmt.Printf("%v", pong)
		global.REDIS = client
	}
}
