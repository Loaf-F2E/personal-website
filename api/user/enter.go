package user

import "personal-website/service"

type ApiGroup struct {
	UserLoginApi
}

var jwtService = service.ServiceGroupApp.SystemServiceGroup.JwtService
