package middleware

import (

	"os"
	"strings"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"

)

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "error",
				"message": "Missing or invalid authorization header",
			})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error ) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "error",
				"message": "Invalid or expired token",
			})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "error",
				"message": "Invalid token claims",
			})
			c.Abort()
			return
		}

		idFloat, ok := claims["id"].(float64)

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "error",
				"message": "Invalid token claims",
			})
			c.Abort()
			return
		}

		c.Set("user_id", int(idFloat))
		c.Set("role", claims["role"])

		c.Next()

	}

}