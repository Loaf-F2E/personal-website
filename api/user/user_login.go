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
	"go.uber.org/zap"
)

type UserLoginApi struct{}

// @Tags merchant
// @Summary 静默登陆
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.LoginForm true "账号"
// @Success 200 {string} string "{"success":true,"data":{"token":"xxxxxxxxx"},"msg":"获取成功"}"
// @Router /user/login [post]
func (e *UserLoginApi) Login(c *gin.Context) {
	var loginForm request.LoginForm
	err := c.ShouldBindJSON(&loginForm)
	if err != nil {
		response.ParamsError(err.Error(), c)
		return
	}
	usr := user.User{}
	// if global.DB.Where("email", loginForm.Email).Limit(1).Find(&usr).RowsAffected == 0 {
	// 	usr.Email = loginForm.Email
	// 	usr.Password = loginForm.Password
	// 	global.DB.Create(&usr)
	// }

	token, exp, err := e.tokenNext(c, usr)
	if err != nil {
		global.LOG.Error(("登录失败"))
		response.FailWithMessage("登录失败", c)
	} else {
		response.OkWithDetailed(response.LoginResponse{
			Token:     token,
			UserId:    int(usr.ID),
			ExpiresAt: exp,
		}, "登陆成功", c)
	}
}

// 登录后下发jwt
func (b *UserLoginApi) tokenNext(c *gin.Context, usr user.User) (tk string, exp int64, err error) {
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
		global.LOG.Error("获取token失败", zap.Any("err", err))
		return "", 0, err
	}
	fmt.Println("3")
	fmt.Printf("%+v\n", usr)
	if _, err := jwtService.GetRedisJWT(strconv.Itoa(int(usr.ID))); err == redis.Nil {
		fmt.Println("4")
		if err := jwtService.SetRedisJWT(token, strconv.Itoa(int(usr.ID))); err != nil {
			fmt.Println("5")
			return "", 0, err
		}
		fmt.Println("6")
		return token, claims.StandardClaims.ExpiresAt * 1000, nil
	} else if err != nil {
		fmt.Println("7")
		return "", 0, err
	} else {
		fmt.Println("8")
		if err := jwtService.SetRedisJWT(token, strconv.Itoa(int(usr.ID))); err != nil {
			return "", 0, err
		}
		fmt.Println("9")
		return token, claims.StandardClaims.ExpiresAt * 1000, nil
	}
}
