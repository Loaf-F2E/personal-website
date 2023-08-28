package user

import (
	"personal-website/global"
	"personal-website/models/common/response"
	"personal-website/models/user"
	"personal-website/models/user/request"
	"personal-website/utils"

	"github.com/gin-gonic/gin"
)

type userLoginApi struct{}

func (e *userLoginApi) Login(c *gin.Context) {
	var loginForm request.LoginForm
	err := c.ShouldBindJSON(&loginForm)
	if err != nil {
		response.ParamsError(err.Error(), c)
		return
	}
	usr := user.User{}
	if global.DB.Where("email", loginForm.Email).Limit(1).Find(&usr).RowsAffected == 0 {
		usr.Email = loginForm.Email
		usr.Password = loginForm.Password
		global.DB.Create(&usr)
	}
}

func (b *userLoginApi) tokenNext(c *gin.Context, usr user.User) (tk string, exp int64, err error) {
	// TODO: config file
	j := &utils.JWT{SigningKey: []byte("12334jfjaghlajgljgjjg")}
	if usr.Nickname == "" {
		usr.Nickname = "-"
	}
}
