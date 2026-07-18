package repository

import (

	"database/sql"

	"server/config"
	"server/models"

)

func GetQRCodeByID(id int) (*models.QRCode, error) {

	var qr models.QRCode

	row := config.DB.QueryRow(
		"SELECT id, code, content, created_at, updated_at FROM qr_codes WHERE id = ?",
		id,
	)

	err := row.Scan(&qr.ID, &qr.Code, &qr.Content, &qr.CreatedAt, &qr.UpdatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &qr, nil

}

func GetQRCodeOwnerID(qrCodeID int) (int, error) {

	var userID int

	err := config.DB.QueryRow(
		"SELECT user_id FROM qr_codes_owners WHERE qr_code_id = ?",
		qrCodeID,
	).Scan(&userID)

	if err != nil {
		if err == sql.ErrNoRows {
			return 0, nil
		}
		return 0, err
	}

	return userID, nil

}

func CreateQRCodeScan(qrCodeID uint64, ipAddress, deviceType, userAgent string) error {

	_, err := config.DB.Exec(
		"INSERT INTO qr_code_scans (qr_code_id, ip_address, device_type, user_agent) VALUES (?, ?, ?, ?)",
		qrCodeID, ipAddress, deviceType, userAgent,
	)

	return err

}

func GetScanCountByQRCodeID(qrCodeID int) (int, error) {

	var count int

	err := config.DB.QueryRow(
		"SELECT COUNT(*) FROM qr_code_scans WHERE qr_code_id = ?",
		qrCodeID,
	).Scan(&count)

	return count, err

}

func GetScansByQRCodeID(qrCodeID int, limit, offset int) ([]models.QRCodeScan, error) {

	if limit <= 0 {
		limit = 50
	}

	rows, err := config.DB.Query(`
		SELECT id, qr_code_id, ip_address, device_type, user_agent, scanned_at
		FROM qr_code_scans
		WHERE qr_code_id = ?
		ORDER BY scanned_at DESC
		LIMIT ? OFFSET ?
	`, qrCodeID, limit, offset)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	scans := []models.QRCodeScan{}

	for rows.Next() {

		var s models.QRCodeScan
		var ip, device, ua sql.NullString

		if err := rows.Scan(&s.ID, &s.QRCodeID, &ip, &device, &ua, &s.ScannedAt); err != nil {
			return nil, err
		}

		s.IPAddress = ip.String
		s.DeviceType = device.String
		s.UserAgent = ua.String

		scans = append(scans, s)

	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return scans, nil

}