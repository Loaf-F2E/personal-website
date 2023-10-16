package user

import "personal-website/service"

type ApiGroup struct {
	UserApi
	UserAuthApi
}

var jwtService = service.ServiceGroupApp.SystemServiceGroup.JwtService
