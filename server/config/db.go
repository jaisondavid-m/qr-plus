package config

import (

	"os"
	"fmt"
	"log"
	"time"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"

)

var DB *sql.DB
var AppBaseURL string

func ConnectDB() {

	_ = godotenv.Load()

	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	AppBaseURL = os.Getenv("APP_BASE_URL")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user, pass, host, port, name)	

	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatalf("Failed to open DB connection: %v", err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5*time.Minute)

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	DB = db

	log.Println("Connected to MySQL database")

}