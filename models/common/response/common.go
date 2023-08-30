package response

type LoginResponse struct {
	Token     string `json:"token"`
	UserId    int    `json:"userID"`
	ExpiresAt int64  `json:"expiresAt"`
}
