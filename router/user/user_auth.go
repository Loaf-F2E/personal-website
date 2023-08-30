package user

import (
	"personal-website/api"

	"github.com/gin-gonic/gin"
)

type AuthRouter struct{}

func (e *AuthRouter) InitLoginRouter(Router *gin.RouterGroup) {
	loginRouter := Router.Group("user")
	var userLoginApi = api.ApiGroupApp.UserApiGroup.UserLoginApi
	{
		loginRouter.POST("login", userLoginApi.Login) // 登录
	}
}
