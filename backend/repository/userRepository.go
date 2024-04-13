package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddUser(name, password string) (models.Member, error) {
	newUser := &models.User{
		Id:       uuid.New().String(),
		Name:     name,
		Password: password,
		TeamId:   "",
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

func (repo *Repository) UserExists(id string) bool {
	var exists bool
	repo.db.Raw("SELECT EXISTS(SELECT FROM users WHERE id = ?)", id).Scan(&exists)
	return exists
}
