package routes

import (
	"server/handlers"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes(router *gin.Engine) {

	v1 := router.Group("/api/v1")
	{
		v1.GET("/health", handlers.HealthCheck)

		auth := v1.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
		}
	}

}
