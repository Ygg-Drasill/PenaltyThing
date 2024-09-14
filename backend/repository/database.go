package repository

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/url"
	"os"
)

type Repository struct {
	db *gorm.DB
}

func ConnectionFromEnvironment() string {
	dbHostname := os.Getenv("DB_HOSTNAME")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := url.QueryEscape(os.Getenv("DB_PASSWORD"))
	dbName := os.Getenv("DB_NAME")
	connectionString := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		dbUser,
		dbPassword,
		dbHostname,
		dbPort,
		dbName)
	return connectionString
}

func ConnectToDatabase(dsn string) *Repository {
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate()
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.User{})
	err = db.AutoMigrate(&models.Team{})
	err = db.AutoMigrate(&models.Law{})
	err = db.AutoMigrate(&models.PenaltyEntry{})
	err = db.AutoMigrate(&models.TeamMember{})
	err = db.AutoMigrate(&models.Invitation{})
	return &Repository{
		db: db,
	}
}
