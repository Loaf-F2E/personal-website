package user

import (
	"fmt"
	"personal-website/global"
	"personal-website/models/common/response"
	"personal-website/models/user"
	"personal-website/models/user/request"
	"personal-website/utils"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
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

// 登录后下发jwt
func (b *userLoginApi) tokenNext(c *gin.Context, usr user.User) (tk string, exp int64, err error) {
	j := &utils.JWT{SigningKey: []byte(global.CONFIG.JWT.SigningKey)}
	if usr.Nickname == "" {
		usr.Nickname = "-"
	}

	claims := j.CreateClaims(utils.BaseClaims{
		ID:       usr.ID,
		Nickname: usr.Nickname,
	})
	token, err := j.CreateToken(claims)
	if err != nil {
		fmt.Println("获取token失败")
		return "", 0, err
	}
	if _, err := jwtService.GetRedisJWT(strconv.Itoa(int(usr.ID))); err == redis.Nil {
		fmt.Println("设置登录状态失败1")
		return "", 0, err
	}
}
