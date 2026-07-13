package handlers

import (
	"net/http"

	"server/config"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {

	var input models.RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	role := "user"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to hash password",
		})
		return
	}

	result, err := config.DB.Exec(
		"INSERT INTO users (user_id, password, role) VALUES (?, ?, ?)",
		input.UserID, string(hashedPassword), role,
	)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"status":  "error",
			"message": "User ID already exists",
		})
		return
	}

	insertID, err := result.LastInsertId()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to fetch new user ID",
		})
		return
	}

	token, err := utils.GenerateToken(int(insertID), input.UserID, role)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to generate token",
		})
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "success",
		"message": "User registered successfully",
		"token": token,
	})

}
