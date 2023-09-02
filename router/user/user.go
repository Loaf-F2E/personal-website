package user

import (
	"personal-website/api"

	"github.com/gin-gonic/gin"
)

type AuthRouter struct{}

func (e *AuthRouter) InitUserRouter(Router *gin.RouterGroup) {
	userRouter := Router.Group("user")
	var UserApi = api.ApiGroupApp.UserApiGroup.UserApi
	{
		userRouter.POST("register", UserApi.Register) // 注册
		userRouter.POST("login", UserApi.Login)       // 登录
	}
}
