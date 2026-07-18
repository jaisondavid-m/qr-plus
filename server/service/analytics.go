package service

import (

	"log"
	"errors"

	"server/repository"
	"server/models"
	"server/utils"
	
)

var ErrForbidden = errors.New("you do not own this qr code")

func recordScan(qrCodeID int, ipAddress, userAgent string) {

	deviceType := utils.DetectDeviceType(userAgent)

	if err := repository.CreateQRCodeScan(uint64(qrCodeID), ipAddress, deviceType, userAgent); err != nil {
		log.Printf("Failed to record scan for qr code id %d: %v",qrCodeID, err)
	}

}

func ListUserQRCodes(userID int) ([]models.QRCodeWithScanCount, error) {
	return repository.GetQRCodesByUserID(userID)
}

func GetQRCodeDetails(qrCodeID, userID int) (*models.QRCodeDetail, error) {

	qr, err := repository.GetQRCodeByID(qrCodeID)

	if err != nil {
		return nil, err
	}

	if qr == nil {
		return nil, ErrQRCodeNotFound
	}

	ownerID, err := repository.GetQRCodeOwnerID(qrCodeID)

	if err != nil {
		return nil, err
	}

	if ownerID != userID {
		return nil, ErrForbidden
	}

	scanCount, err := repository.GetScanCountByQRCodeID(qrCodeID)

	if err != nil {
		return nil, err
	}

	scans, err := repository.GetScansByQRCodeID(qrCodeID, 50, 0)

	if err != nil {
		return nil, err
	}

	return &models.QRCodeDetail{
		ID: qr.ID,
		Code: qr.Code,
		Content: qr.Content,
		CreatedAt: qr.CreatedAt,
		UpdatedAt: qr.UpdatedAt,
		ScanCount: scanCount,
		Scans: scans,
	}, nil

}