package repository

import (
	models2 "github.com/Ygg-Drasill/PenaltyThing/backend/api/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddMember(teamId, userId string) (*models2.TeamMember, error) {
	var member *models2.TeamMember

	member = &models2.TeamMember{
		Id:     uuid.New().String(),
		UserId: userId,
		TeamId: teamId,
	}

	res := repo.db.Save(member)
	return member, res.Error
}

func (repo *Repository) GetMembersByTeamId(teamId string) ([]models2.TeamMember, error) {
	var members []models2.TeamMember
	res := repo.db.Where("team_id = ?", teamId).Find(&members)
	return members, res.Error
}

func (repo *Repository) GetMemberAsUser(memberId string) (*models2.UserPublic, error) {
	var teamMember models2.TeamMember
	repo.db.Find(&teamMember, "id = ?", memberId)
	user, err := repo.GetUserById(teamMember.UserId)
	if err != nil {
		return nil, err
	}
	return user.ToUserResponse(), nil
}
