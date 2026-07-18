package repository

import (
	"server/config"
	"server/models"
)

func CreateQRCodeOwner(qrCodeID int64, userID int) error {

	_, err := config.DB.Exec(
		"INSERT INTO qr_codes_owners (qr_code_id, user_id) VALUES (?, ?)",
		qrCodeID, userID,
	)

	return err

}

func GetQRCodesByUserID(userID int) ([]models.QRCodeWithScanCount, error) {

	rows, err := config.DB.Query(`
		SELECT qc.id, qc.code, qc.content, qc.created_at, qc.updated_at,
			COALESCE(sc.scan_count,0) AS scan_count
		FROM qr_codes qc
		JOIN qr_codes_owners qco ON qco.qr_code_id = qc.id
		LEFT JOIN (
			SELECT
				qr_code_id,
				COUNT(*) AS scan_count
			FROM qr_code_scans
			GROUP BY qr_code_id
		) sc
		ON sc.qr_code_id = qc.id
		WHERE qco.user_id = ?
		ORDER BY qc.created_at DESC
	`, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	result := []models.QRCodeWithScanCount{}

	for rows.Next() {

		var qr models.QRCodeWithScanCount

		if err := rows.Scan(&qr.ID, &qr.Code, &qr.Content, &qr.CreatedAt, &qr.UpdatedAt, &qr.ScanCount ); err != nil {
			return nil, err
		}

		result = append(result, qr)

	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil

}