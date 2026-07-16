package handlers

import (

	"fmt"
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