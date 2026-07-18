package handlers

import (
	"errors"
	"fmt"
	"strconv"

	// "os"

	// "errors"
	"net/http"

	"server/models"
	"server/service"

	"github.com/gin-gonic/gin"
)

func CreateQRCode(c *gin.Context)  {

	var input models.CreateQRInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}

	userID, exists := c.Get("user_id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "error",
			"message": "Unauthorized",
		})
		return
	}

	qr, err := service.CreatedQRCode(input.Content, userID.(int))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "success",
		"message": "QR code created successfully",
		"data": gin.H{
			"code": qr.Code,
			"content": qr.Content,
			"image_url": fmt.Sprintf("/qr/%s/image", qr.Code),
		},
	})

}

func GetQRCodeImage(c *gin.Context) {

	code := c.Param("code")

	png, err := service.GetQRCodeImage(code, c.ClientIP(), c.Request.UserAgent())

	if err != nil {

		if errors.Is(err, service.ErrQRCodeNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"status": "error",
				"message": "QR code not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": "Failed to generate QR code image",
		})
		return

	}

	c.Data(http.StatusOK, "image/png", png)

}

func ListQRCodes(c *gin.Context) {

	userID, exists := c.Get("user_id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "error",
			"message": "Unauthorized",
		})
		return
	}

	qrCodes, err := service.ListUserQRCodes(userID.(int))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": qrCodes,
	})

}

func GetQRCodeDetails(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"message": "Invalid QR code id",
		})
		return
	}

	userID, exists := c.Get("user_id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "error",
			"message": "Unauthorized",
		})
		return
	}

	detail, err := service.GetQRCodeDetails(id, userID.(int))

	if err != nil {

		if errors.Is(err, service.ErrQRCodeNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"status": "error",
				"message": "QR code not found",
			})
			return
		}

		if errors.Is(err, service.ErrForbidden) {
			c.JSON(http.StatusForbidden, gin.H{
				"status": "error",
				"message": "You do not have access to this QR Code",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return

	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": detail,
	})

}