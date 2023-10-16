package utils

import "regexp"

func IsEmail(email string) bool {
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	reg := regexp.MustCompile(pattern)

	return reg.MatchString(email)
}
