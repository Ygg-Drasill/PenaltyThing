package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) AddTeam(name string) (*models.Team, error) {
	newTeam := &models.Team{
		Id:      uuid.New().String(),
		Name:    name,
		Members: make([]models.TeamMember, 0),
		Laws:    make([]models.Law, 0),
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

func (repo *Repository) GetTeam(id string) (*models.Team, error) {
	var team models.Team
	res := repo.db.First(&team, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	return &team, nil
}

func (repo *Repository) AddUserToTeam(userId, teamId string) error {
	var team models.Team
	var user models.User
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

func (repo *Repository) GetTeamsByUserId(userId string) ([]models.Team, error) {
	var user *models.User
	var members []models.TeamMember
	var teams []models.Team
	var err error
	user, err = repo.GetUserById(userId)
	if err != nil {
		return nil, err
	}

	if result := repo.db.Find(&members, "user_id = ?", user.Id); result.Error != nil {
		return nil, result.Error
	}

	for _, member := range members {
		var team models.Team
		result := repo.db.First(&team, "id = ?", member.TeamId)
		if result.Error != nil {
			return nil, result.Error
		}
		teams = append(teams, team)
	}

	return teams, nil
}

func (repo *Repository) UserInTeam(userId string, teamId string) bool {
	var exists bool
	repo.db.Raw("SELECT EXISTS(SELECT FROM team_members WHERE user_id = ? AND team_id = ?)", userId, teamId).Scan(&exists)
	return exists
}
