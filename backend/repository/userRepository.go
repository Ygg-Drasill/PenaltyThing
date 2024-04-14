package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddUser(username, passwordHash, firstName, lastName string) (models.Member, error) {
	newUser := &models.User{
		Id:           uuid.New().String(),
		Username:     username,
		PasswordHash: passwordHash,
		FirstName:    firstName,
		LastName:     lastName,
		TeamId:       "",
	}
	res := repo.db.Create(newUser)
	return newUser.ToMember(), res.Error
}

func (repo *Repository) GetUserById(id string) (*models.User, error) {
	var user models.User
	res := repo.db.Find(&user, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
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
