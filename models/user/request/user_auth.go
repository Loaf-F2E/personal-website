package request

type LoginForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password"`
}
