package utils

import (
	"personal-website/global"

	"github.com/gin-gonic/gin"
)

func GetClaims(c *gin.Context) (*CustomClaims, error) {
	token := c.Request.Header.Get("token")
	j := NewJWT()
	claims, err := j.ParseToken(token)
	if err != nil {
		global.LOG.Error("从Gin的Context中获取从jwt解析信息失败, 请检查请求头是否存在token且claims是否为规定结构")
	}
	return claims, err
}

// 从Gin的Context中获取从jwt解析出来的玩家ID
func GetUserID(c *gin.Context) uint {
	if claims, exists := c.Get("claims"); !exists {
		if cl, err := GetClaims(c); err != nil {
			return 0
		} else {
			return cl.ID
		}
	} else {
		waitUse := claims.(*CustomClaims)
		return waitUse.ID
	}

}
