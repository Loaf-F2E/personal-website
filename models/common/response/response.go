package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	ERROR   = 1
	SUCCESS = 0
)

type Response struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
	Msg  string      `json:"msg"`
}

func Result(code int, data interface{}, msg string, c *gin.Context) {
	c.JSON(http.StatusOK, Response{
		code,
		data,
		msg,
	})
}

func NoLogin(message string, c *gin.Context) {
	c.JSON(http.StatusUnauthorized, Response{
		ERROR,
		map[string]interface{}{},
		message,
	})
}

func ParamsError(message string, c *gin.Context) {
	c.JSON(http.StatusUnprocessableEntity, Response{
		ERROR,
		map[string]interface{}{},
		message,
	})
}

func OkWithDetailed(data interface{}, message string, c *gin.Context) {
	Result(SUCCESS, data, message, c)
}

func FailWithMessage(message string, c *gin.Context) {
	Result(ERROR, map[string]interface{}{}, message, c)
}
