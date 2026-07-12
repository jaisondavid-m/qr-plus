package main

import (

	// "net/http"
	"log"
	"os"
	"strings"
	"time"

	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	_ = godotenv.Load()

	router := gin.Default()

	origins := strings.Split(os.Getenv("CLIENT_URLS"),",")

	allowedOrigins := make([]string, 0, len(origins))
	
	for _, origin := range origins {
		allowedOrigins = append(allowedOrigins, strings.TrimSpace(origin))
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins: allowedOrigins,
		AllowMethods: []string{"GET","POST","PUT","PATCH","DELETE","OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12*time.Hour,
	}))

	routes.SetUpRoutes(router)

	log.Println("Server is running on http://localhost:8000")
	log.Println("Health check: http://localhost:8000/health")

	if err := router.Run(":8000"); err != nil {
		log.Fatal(err)
	}

}