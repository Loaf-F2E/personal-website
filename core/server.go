package core

import (
	"personal-website/initialize"
	"time"

	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
)

type server interface {
	ListenAndServe() error
}

func initServer(address string, router *gin.Engine) server {
	s := endless.NewServer(address, router)
	s.ReadHeaderTimeout = 10 * time.Millisecond // 读取请求头的超时时间
	s.WriteTimeout = 10 * time.Second           // 在写入响应数据的超时时间 如果在10秒内没有完成响应数据的写入，服务器将中断连接或返回一个错误响应
	s.MaxHeaderBytes = 1 << 20                  // 1MB  限制了HTTP请求头的最大字节数
	return s
}

func RunServer() {
	// absPath, _ := os.Getwd()
	// sql, err := ioutil.ReadFile(absPath + "/example.sql")
	// fmt.Println("sql:", string(sql))
	// if err != nil {
	// 	fmt.Println("ReadFile sql执行错误:", err)
	// } else {
	// 	global.DB.Exec(string(sql))
	// 	fmt.Println("sql执行了")
	// }

	initialize.Redis()
	Router := initialize.Routers()

	s := initServer(":7777", Router)
	s.ListenAndServe()
}
