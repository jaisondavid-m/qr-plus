package models

type User struct {
	ID 			int 		`json:"id"`
	UserID 		string 		`json:"user_id"`
	Password 	string 		`json:"-"`
	Role 		string 		`json:"role"`
}

type LoginInput struct {
	UserID 		string		`json:"user_id" binding:"required"`
	Password 	string		`json:"password" binding:"required"`
}

type RegisterInput struct {
	UserID 		string		`json:"user_id" binding:"required"`
	Password 	string		`json:"password" binding:"required"`
}