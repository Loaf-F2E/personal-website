package request

type RegisterForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
	Gender   int    `json:"gender"`
}

type LoginForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
