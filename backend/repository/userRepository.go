package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
	"strings"
)

func (repo *Repository) AddUser(username, passwordHash, firstName, lastName string) (*models.User, error) {
	newUser := &models.User{
		Id:           uuid.New().String(),
		Username:     username,
		PasswordHash: passwordHash,
		FirstName:    firstName,
		LastName:     lastName,
	}
	res := repo.db.Create(newUser)
	return newUser, res.Error
}

func (repo *Repository) GetUserById(id string) (*models.User, error) {
	var user models.User
	res := repo.db.Find(&user, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
}

func (repo *Repository) GetUsers() ([]models.User, error) {
	var users []models.User
	res := repo.db.Find(&users)
	if res.Error != nil {
		return nil, res.Error
	}
	return users, nil
}

func (repo *Repository) GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	res := repo.db.Find(&user, "username = ?", username)
	if res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
}

func (repo *Repository) UserExists(id string) bool {
	var exists bool
	repo.db.Raw("SELECT EXISTS(SELECT FROM users WHERE id = ?)", id).Scan(&exists)
	return exists
}

func (repo *Repository) GetUserCredentials(username string) (*models.User, error) {
	var user models.User
	res := repo.db.Where("username = ?", username).Find(&user)
	if res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
}

func (repo *Repository) GetUsersByIds(ids []string) ([]*models.User, error) {
	var users []*models.User
	res := repo.db.Where("id IN (?)", strings.Join(ids, ",")).Find(&users)
	if res.Error != nil {
		return nil, res.Error
	}
	return users, nil
}
