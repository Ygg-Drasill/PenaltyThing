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

func (repo *Repository) GetMembersByTeamId(teamId string) ([]models.TeamMember, error) {
	var members []models.TeamMember
	res := repo.db.Where("team_id = ?", teamId).Find(&members)
	return members, res.Error
}

func (repo *Repository) GetMemberAsUser(memberId string) (*models.UserPublic, error) {
	var teamMember models.TeamMember
	repo.db.Find(&teamMember, "id = ?", memberId)
	user, err := repo.GetUserById(teamMember.UserId)
	if err != nil {
		return nil, err
	}
	return user.ToUserResponse(), nil
}
