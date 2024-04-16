package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddMember(teamId, userId string) (*models.TeamMember, error) {
	var member *models.TeamMember

	member = &models.TeamMember{
		Id:     uuid.New().String(),
		UserId: userId,
		TeamId: teamId,
	}

	res := repo.db.Save(member)
	return member, res.Error
}
