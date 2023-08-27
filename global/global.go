package global

import (
	"github.com/spf13/viper"
	"golang.org/x/sync/singleflight"
	"gorm.io/gorm"
)

var (
	DB                  *gorm.DB
	VP                  *viper.Viper
	Concurrency_Control = &singleflight.Group{}
)
