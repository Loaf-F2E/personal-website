package user

import "personal-website/service"

type ApiGroup struct {
	UserApi
}

var jwtService = service.ServiceGroupApp.SystemServiceGroup.JwtService
