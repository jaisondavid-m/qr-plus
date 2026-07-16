package models

import "time"

type QRCode struct {
	ID 			int 		`json:"id"`
	Code 		string 		`json:"code"`
	Content 	string 		`json:"content"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type CreateQRInput struct {
	Content string `json:"content" binding:"required"`
}