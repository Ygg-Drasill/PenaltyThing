package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
	"strings"
)

func (repo *Repository) AddUser(
	username,
	email,
	passwordHash,
	firstName,
	lastName string,
) (
	*models.User, error) {
	newUser := &models.User{
		Id:           uuid.New().String(),
		Username:     username,
		Email:        email,
		PasswordHash: passwordHash,
		FirstName:    firstName,
		LastName:     lastName,
		Status:       "Unblooded Drengr",
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

func (repo *Repository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	res := repo.db.Find(&user, "email = ?", email)
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

func (repo *Repository) GetUserCredentials(email string) (*models.User, error) {
	var user models.User
	res := repo.db.Where("email = ?", email).Find(&user)
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
