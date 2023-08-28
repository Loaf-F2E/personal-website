package global

import (
	"personal-website/config"

	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"golang.org/x/sync/singleflight"
	"gorm.io/gorm"
)

var (
	DB                  *gorm.DB
	VP                  *viper.Viper
	CONFIG              config.Server
	REDIS               *redis.Client
	Concurrency_Control = &singleflight.Group{}
)
