package main

import (
	"personal-website/core"
	"personal-website/global"
	"personal-website/initialize"
)

// @title personal-website API
// @version 1.0.0
// @description personal-website API
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name token
// @BasePath /
func main() {
	global.VP = core.Viper()
	global.DB = initialize.Gorm()
	if global.DB != nil {
		db, _ := global.DB.DB()
		defer db.Close()
	}
	core.RunServer()
}
