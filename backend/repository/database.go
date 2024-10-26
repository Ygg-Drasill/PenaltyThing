package repository

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"net/url"
	"os"
)

type Repository struct {
	db *gorm.DB
}

const createNotificationTypeQuery = `
DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
            CREATE TYPE notification_type AS ENUM ('ANY', 'INVITATION', 'PENALTY');
        END IF;
    END$$;
`

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

func ConnectToDatabase(dsn string, logger logger.Interface) *Repository {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger,
	})
	if err != nil {
		panic(err)
	}
	err = db.Exec(createNotificationTypeQuery).Error
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
	err = db.AutoMigrate(&models.Notification{})
	return &Repository{
		db: db,
	}
}
