package service

import (
	"errors"
	"fmt"

	"server/config"
	"server/models"
	"server/repository"
	"server/utils"

	"github.com/go-sql-driver/mysql"
)

var ErrQRCodeNotFound = errors.New("qr code not found")

func CreatedQRCode(content string, userID int) (*models.QRCode, error) {

	var (
		code 		string
		qrCodeID 	int64
		err 		error
	)

	for attempts := 0; attempts < 5; attempts++ {

		code, err = utils.GenerateShortCode(8)

		if err != nil {
			return nil, err
		}

		qrCodeID, err = repository.CreateQRCode(code, content)

		if err == nil {
			break
		}

		if !isDuplicateEntryError(err) {
			return nil, err
		}

	}

	if err != nil {
		return nil, err
	}

	if err := repository.CreateQRCodeOwner(qrCodeID, userID); err != nil {
		return nil, err
	}

	return &models.QRCode{
		ID: int(qrCodeID),
		Code: code,
		Content: content,
	}, nil

}

func isDuplicateEntryError(err error) bool {

	var mysqlErr *mysql.MySQLError

	if errors.As(err, &mysqlErr) {
		return mysqlErr.Number == 1062
	}

	return false

}

func GetQRCodeImage(code string) ([]byte, error) {

	qr, err := repository.GetQRCodeByCode(code)

	if err != nil {
		return nil, err
	}

	if qr == nil {
		return nil, ErrQRCodeNotFound
	}

	redirectURL := fmt.Sprintf("%s/r/%s", config.AppBaseURL, qr.Code)

	png, err := utils.GenerateQRCodePNG(redirectURL, 256)

	if err != nil {
		return nil, err
	}

	// go recordScan(qr.ID, ipAddress, userAgent)

	return png, nil

}

func ResolveAndRecordScan(code, ipAddress, userAgent string) (string, error) {

	qr, err := repository.GetQRCodeByCode(code)

	if err != nil {
		return "", err
	}

	if qr == nil {
		return "", ErrQRCodeNotFound
	}

	go recordScan(qr.ID, ipAddress, userAgent)

	return qr.Content, nil

}