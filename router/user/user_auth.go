package user

import (
	"personal-website/models/user/request"

	"github.com/gin-gonic/gin"
)

type AuthRouter struct{}

func (e *AuthRouter) InitLoginRouter(Router *gin.RouterGroup) {
	loginRouter := Router.Group("user")
	var userLoginApi = request.LoginForm

}
