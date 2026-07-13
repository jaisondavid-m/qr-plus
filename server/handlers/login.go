package handlers

import (
	
	"database/sql"
	"net/http"

	"server/config"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

)

func Login(c *gin.Context) {

	var input models.LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return 
	}

	var (
		id 			int
		userID 		string
		password 	string
		role 		string
	)

	row := config.DB.QueryRow(
		"SELECT id, user_id, password, role FROM users WHERE user_id = ?",
		input.UserID,
	)

	err := row.Scan(&id, &userID, &password, &role)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "error",
			"message": "Invalid credentials",
		})
		return 
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "error",
			"message": "Invalid credentials",
		})
		return 
	}

	token, err := utils.GenerateToken(id, userID, role)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"message": "Login Successfully",
		"token": token,
	})

}