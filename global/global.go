package global

import (
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
	VP *viper.Viper
)
