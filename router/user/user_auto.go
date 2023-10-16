package user

import (
	"personal-website/api"

	"github.com/gin-gonic/gin"
)

type UserAuthRouter struct{}

func (e UserAuthRouter) InitUserAuthRouter(Router *gin.RouterGroup) {
	userRouter := Router.Group("user")
	var UserApi = api.ApiGroupApp.UserApiGroup.UserAuthApi

	{
		userRouter.GET("info", UserApi.Info) // 获取用户信息
	}
}
