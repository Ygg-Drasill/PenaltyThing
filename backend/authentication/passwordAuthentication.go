package authentication

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/Ygg-Drasill/PenaltyThing/backend/repository"
	"golang.org/x/crypto/bcrypt"
)

func AuthenticatePassword(email, password string, db *repository.Repository) bool {
	var user *models.User
	var err error
	user, err = db.GetUserCredentials(email)
	if err != nil {
		fmt.Printf("Error getting user credentials: %v\n", err)
		return false
	}
	if err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
