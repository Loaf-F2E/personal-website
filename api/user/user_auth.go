package user

import (
	"personal-website/global"
	"personal-website/models/common/response"
	"personal-website/models/user"
	"personal-website/utils"

	"github.com/gin-gonic/gin"
)

type UserAuthApi struct{}

// @Tags user
// @Summary 获取玩家信息
// @Security ApiKeyAuth
// @accept application/x-www-form-urlencoded
// @Produce application/json
// @Success 200 {string} string "{"code":0,"data":{"avatar":"", "email":"", "nickname":"", "id":"1"},"msg":"操作成功"}"
// @Router /user/info [get]
func (e *UserAuthApi) Info(c *gin.Context) {
	var userInfo user.User
	userId := utils.GetUserID(c)

	global.DB.First(&userInfo, userId)
	response.OkWithData(gin.H{
		"id":       userId,
		"nickname": userInfo.Nickname,
		"avatar":   userInfo.Avatar,
		"email":    userInfo.Email,
		"gender":   userInfo.Gender,
	}, c)
}
