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

type UserApi struct{}

// @Tags user
// @Summary 注册
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.RegisterForm true "账号"
// @Success 200 {string} string "{"success":true,"data":{"token":"xxxxxxxxx"},"msg":"获取成功"}"
// @Router /user/register [post]
func (e *UserApi) Register(c *gin.Context) {
	var registerForm request.RegisterForm
	fmt.Println("registerForm:", registerForm)
	err := c.ShouldBindJSON(&registerForm)
	if err != nil {
		response.ParamsError(err.Error(), c)
		return
	}
	isEmail := utils.IsEmail(registerForm.Email)
	fmt.Println("isEmail:", isEmail)
	usr := user.User{}

	if !isEmail {
		response.FailWithMessage("该账号不是一个有效的邮箱地址", c)
	}
	if global.DB.Where("email", registerForm.Email).Limit(1).Find(&usr).RowsAffected == 0 {
		fmt.Println("zhixingle")
		usr.Email = registerForm.Email
		usr.Password = registerForm.Password
		usr.Avatar = registerForm.Avatar
		usr.Nickname = registerForm.Nickname
		usr.Gender = registerForm.Gender
		global.DB.Create(&usr)
		response.OkWithMessage("注册成功", c)
	} else {
		fmt.Println("zhixingle123")
		response.FailWithMessage("该账号已存在", c)
	}
}

// @Tags user
// @Summary 登陆
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.LoginForm true "账号"
// @Success 200 {string} string "{"success":true,"data":{"token":"xxxxxxxxx"},"msg":"获取成功"}"
// @Router /user/login [post]
func (e *UserApi) Login(c *gin.Context) {
	var loginForm request.LoginForm
	err := c.ShouldBindJSON(&loginForm)
	if err != nil {
		response.ParamsError(err.Error(), c)
		return
	}

	var userSwitch user.User
	res := global.DB.Where("email", loginForm.Email).Find(&userSwitch)
	if res.RowsAffected == 0 {
		response.FailWithMessage("该用户不存在", c)
		return
	}
	token, exp, err := e.tokenNext(c, userSwitch)
	if err != nil {
		global.LOG.Error(("登录失败"))
		response.FailWithMessage("登录失败", c)
	} else {
		response.OkWithDetailed(response.LoginResponse{
			Token:     token,
			UserId:    int(userSwitch.ID),
			ExpiresAt: exp,
		}, "登陆成功", c)
	}
}

// 登录后下发jwt
func (b *UserApi) tokenNext(c *gin.Context, usr user.User) (tk string, exp int64, err error) {
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
