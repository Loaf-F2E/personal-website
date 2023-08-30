package router

import "personal-website/router/user"

type RouterGroup struct {
	User user.RouterGroup
}

var RouterGroupApp = new(RouterGroup)
