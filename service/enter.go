package service

import "personal-website/service/system"

type ServiceGroup struct {
	SystemServiceGroup system.ServiceGroup
}

var ServiceGroupApp = new(ServiceGroup)
