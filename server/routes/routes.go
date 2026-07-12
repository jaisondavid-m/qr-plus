package routes

import (

	"server/handlers"

	"github.com/gin-gonic/gin"

)

func SetUpRoutes(router *gin.Engine) {
	router.GET("/health", handlers.HealthCheck)
}