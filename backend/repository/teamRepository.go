package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddTeam(name string) (*models.Team, error) {
	newTeam := &models.Team{
		Id:      uuid.New().String(),
		Name:    name,
		Members: make([]models.User, 0),
		Laws:    make([]models.Law, 0),
	}
	res := repo.db.Create(newTeam)
	if res.Error != nil {
		return nil, res.Error
	}
	return newTeam, nil
}

func (repo *Repository) AddUserToTeam(userId, teamId string) error {
	var team models.Team
	var user models.User
	teamResult := repo.db.Find(&team, "id = ?", teamId)
	userResult := repo.db.Find(&user, "id = ?", userId)

	if teamResult.Error != nil {
		return teamResult.Error
	}
	if userResult.Error != nil {
		return userResult.Error
	}

	team.Members = append(team.Members, user)
	return nil
}
