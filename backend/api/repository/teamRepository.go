package repository

import (
	models2 "github.com/Ygg-Drasill/PenaltyThing/backend/api/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddTeam(name string) (*models2.Team, error) {
	newTeam := &models2.Team{
		Id:      uuid.New().String(),
		Name:    name,
		Members: make([]models2.TeamMember, 0),
		Laws:    make([]models2.Law, 0),
	}
	res := repo.db.Create(newTeam)
	if res.Error != nil {
		return nil, res.Error
	}
	return newTeam, nil
}

func (repo *Repository) TeamExists(id string) bool {
	var exists bool
	repo.db.Raw("SELECT EXISTS(SELECT FROM teams WHERE id = ?)", id).Scan(&exists)
	return exists
}

func (repo *Repository) GetTeam(id string) (*models2.Team, error) {
	var team models2.Team
	res := repo.db.First(&team, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	return &team, nil
}

func (repo *Repository) AddUserToTeam(userId, teamId string) error {
	var team models2.Team
	var user models2.User
	teamResult := repo.db.Find(&team, "id = ?", &teamId)
	userResult := repo.db.Find(&user, "id = ?", &userId)
	member, memberError := repo.AddMember(team.Id, user.Id)

	if teamResult.Error != nil {
		return teamResult.Error
	}
	if userResult.Error != nil {
		return userResult.Error
	}
	if memberError != nil {
		return memberError
	}

	team.Members = append(team.Members, *member)
	user.TeamMembers = append(user.TeamMembers, *member)
	repo.db.Save(&team)
	repo.db.Save(&user)
	return nil
}

func (repo *Repository) GetTeamsByUserId(userId string) ([]models2.Team, error) {
	var user *models2.User
	var members []models2.TeamMember
	var teams []models2.Team
	var err error
	user, err = repo.GetUserById(userId)
	if err != nil {
		return nil, err
	}

	if result := repo.db.Find(&members, "user_id = ?", user.Id); result.Error != nil {
		return nil, result.Error
	}

	for _, member := range members {
		var team models2.Team
		result := repo.db.First(&team, "id = ?", member.TeamId)
		if result.Error != nil {
			return nil, result.Error
		}
		teams = append(teams, team)
	}

	return teams, nil
}
