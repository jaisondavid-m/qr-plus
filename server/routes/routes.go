package routes

import (
	"server/handlers"
	"server/middleware"

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

	qr := v1.Group("/qrcodes")
	qr.Use(middleware.AuthMiddleware())
	{
		qr.POST("/", handlers.CreateQRCode)
		qr.GET("/", handlers.ListQRCodes)
		qr.GET("/:id", handlers.GetQRCodeDetails)
	}

	router.GET("/qr/:code/image", handlers.GetQRCodeImage)
	router.GET("/r/:code", handlers.RedirectQRCode)

}