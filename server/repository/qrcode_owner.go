package repository

import "server/config"

func CreateQRCodeOwner(qrCodeID int64, userID int) error {

	_, err := config.DB.Exec(
		"INSERT INTO qr_codes_owners (qr_code_id, user_id) VALUES (?, ?)",
		qrCodeID, userID,
	)

	return err

}