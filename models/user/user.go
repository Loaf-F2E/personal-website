package user

import "personal-website/global"

type User struct {
	global.MODEL
	Nickname string `json:"nickname" from:"nickname" gorm:"comment:昵称"`
	Avatar   string `json:"avatar" form:"avatar" gorm:"comment:头像"`
	Email    string `json:"Email" form:"Email" gorm:"comment:邮箱;unique;not null"`
	Password string `json:"password" form:"password" gorm:"comment:密码;not null"`
	Gender   int    `json:"gender" form:"gender" gorm:"comment:性别"`
}

// GORM 默认使用结构体的复数形式作为表名，例如 `User` 结构体对应的表名为 `users`
func (User) TableName() string {
	return "users"
}
