package repository

import (

	"database/sql"

	"server/config"
	"server/models"

)

func CreateQRCode(code string, content string) (int64, error) {

	result, err := config.DB.Exec(
		"INSERT INTO qr_codes (code, content) VALUES (?, ?)",
		code, content,
	)

	if err != nil {
		return 0, err
	}

	return result.LastInsertId()

}

func GetQRCodeByCode(code string) (*models.QRCode, error) {

	var qr models.QRCode

	rows := config.DB.QueryRow(
		"SELECT id, code, content, created_at, updated_at FROM qr_codes WHERE code = ?",
		code,
	)

	err := rows.Scan(&qr.ID, &qr.Code, &qr.Content, &qr.CreatedAt, &qr.UpdatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &qr, nil

}

// func GetQRCodeByCode(code string) (*models.QRCode, error) {

// 	var qr models.QRCode

// 	row := config.DB.QueryRow(
// 		"SELECT id, code, content, created_at, updated_at FROM qr_codes WHERE code = ?",
// 		code,
// 	)

// 	err := row.Scan(&qr.ID, &qr.Code, &qr.Content, &qr.CreatedAt, &qr.UpdatedAt)

// 	if err != nil {
// 		if err == sql.ErrNoRows {
// 			return nil, nil
// 		}
// 		return nil, err
// 	}

// 	return &qr, nil

// }