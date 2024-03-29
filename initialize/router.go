package initialize

import (
	_ "personal-website/docs"
	"personal-website/middleware"
	"personal-website/router"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func Routers() *gin.Engine {
	var Router = gin.Default()

	Router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	PublicGroup := Router.Group("")
	PrivateGroup := Router.Group("")
	{
		PublicGroup.GET("/health", func(c *gin.Context) {
			c.JSON(200, "ok")
		})
	}
	userRouter := router.RouterGroupApp.User
	PrivateGroup.Use(middleware.JWTAuth())
	// private
	{
		userRouter.InitUserAuthRouter(PrivateGroup)
	}
	// public
	{
		userRouter.InitUserRouter(PublicGroup)
	}
	return Router
}
