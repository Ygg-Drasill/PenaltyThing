package repository

import (
	"fmt"
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

func (repo *Repository) GetUsersByIds(idList []string) ([]models.UserPublic, error) {
	for i, id := range idList {
		idList[i] = fmt.Sprintf("'%s'", id)
	}
	idListString := strings.Join(idList, ", ")
	users := make([]models.User, len(idList))
	usersPublic := make([]models.UserPublic, len(idList))
	result := repo.db.Raw(fmt.Sprintf("SELECT * FROM users WHERE id IN (%s)", idListString)).Scan(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	for i, user := range users {
		usersPublic[i] = *user.ToUserResponse()
	}
	return usersPublic, nil
}
