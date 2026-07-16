package utils

import "github.com/skip2/go-qrcode"

func GenerateQRCodePNG(content string, size int) ([]byte, error) {
	return qrcode.Encode(content, qrcode.Medium, size)
}