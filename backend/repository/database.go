package repository

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

type Repository struct {
	db *gorm.DB
}

func CreateConnectionFromEnvironment() string {
	host := os.Getenv("HOST")
	return fmt.Sprintf("%s", host)
}

func ConnectToDatabase(dsn string) *Repository {
	db, err := gorm.Open(postgres.Open(dsn))
	err = db.AutoMigrate()
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.User{})
	err = db.AutoMigrate(&models.Team{})
	err = db.AutoMigrate(&models.Law{})
	err = db.AutoMigrate(&models.PenaltyEntry{})
	return &Repository{
		db: db,
	}
}
