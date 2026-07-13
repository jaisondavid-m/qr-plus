package handlers

import (

	"net/http"

	"server/config"

	"github.com/gin-gonic/gin"

)

func HealthCheck(c *gin.Context) {

	dbStatus := "connected"
	dbErr := ""

	if config.DB == nil {
		dbStatus = "disconnected"
		dbErr = "DB not intialized"
	} else if err := config.DB.Ping(); err != nil {
		dbStatus = "disconnected"
		dbErr = err.Error()
	}

	statusCode := http.StatusOK
	overallStatus := "success"

	if dbStatus != "connected" {
		statusCode = http.StatusServiceUnavailable
		overallStatus = "error"
	}

	response := gin.H{
		"status": overallStatus,
		"message": "Server is running",
		"code": statusCode,
		"database": gin.H{
			"status": dbStatus,
		},
	}

	if dbErr != "" {
		response["database"].(gin.H)["error"] = dbErr
	}

	c.JSON(statusCode, response)

}