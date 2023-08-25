package main

import (
	"personal-website/core"
	"personal-website/global"
	"personal-website/initialize"
)

func main() {
	global.VP = core.Viper()
	global.DB = initialize.Gorm()
	if global.DB != nil {
		db, _ := global.DB.DB()
		defer db.Close()
	}
	core.RunServer()
}
