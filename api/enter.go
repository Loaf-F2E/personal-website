package api

import "personal-website/api/user"

type ApiGroup struct {
	UserApiGroup user.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
