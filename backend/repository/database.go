package repository

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func CreateConnectionString() string {
	return ""
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

func (repo *Repository) AddUser(name string, password string) error {
	newUser := models.User{
		Id:       uuid.New().String(),
		Name:     name,
		Password: password,
	}
	res := repo.db.Create(&newUser)
	return res.Error
}

func (repo *Repository) GetUserById(id string) models.User {
	var user models.User
	res := repo.db.Find(&user, "id = ?", id)
	if res.Error != nil {
		fmt.Println(res.Error.Error())
	}
	return user
}
