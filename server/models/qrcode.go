package models

import (
	
	"time"

)

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

type QRCodeScan struct {
	ID 			int 		`json:"id"`
	QRCodeID 	int 		`json:"qr_code_id"`
	IPAddress 	string 		`json:"ip_address"`
	DeviceType 	string 		`json:"device_type"`
	UserAgent 	string 		`json:"user_agent"`
	ScannedAt 	time.Time 	`json:"scanned_at"`
}

type QRCodeWithScanCount struct {
	ID 			int 		`json:"id"`
	Code 		string 		`json:"code"`
	Content 	string 		`json:"content"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"udpated_at"`
	ScanCount 	int 		`json:"scan_count"`
}

type QRCodeDetail struct {
	ID 			int 			`json:"id"`
	Code 		string 			`json:"code"`
	Content 	string 			`json:"content"`
	CreatedAt 	time.Time 		`json:"created_at"`
	UpdatedAt 	time.Time 		`json:"updated_at"`
	ScanCount 	int 			`json:"scan_count"`
	Scans 		[]QRCodeScan 	`json:"scans"`
}