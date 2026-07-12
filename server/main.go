package main

import (

	"net/http"
	"log"

	"github.com/gin-gonic/gin"

)

func main() {

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Server is running",
		})
	})

	log.Println("Server is running on http://localhost:8000")

	if err := router.Run(":8000"); err != nil {
		log.Fatal(err)
	}

}