package user

import "personal-website/global"

type User struct {
	global.MODEL
	Nickname string `json:"nickname" from:"nickname" gorm:"comment:昵称"`
	Avatar   string `json:"avatar" form:"avatar" gorm:"comment:头像"`
	Email    string `json:"Email" form:"Email" gorm:"comment:邮箱;uniqueIndex;not null"`
	Password string `json:"password" form:"password" gorm:"comment:密码;not null"`
	Gender   int    `json:"gender" form:"gender" gorm:"comment:性别"`
}
