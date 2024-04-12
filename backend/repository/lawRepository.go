package repository

import "github.com/Ygg-Drasill/PenaltyThing/backend/models"

func (repo *Repository) GetLawsByTeam(teamId string) ([]models.Law, error) {
	var laws []models.Law
	res := repo.db.Where("teamId = ?", teamId).Find(&laws)
	if res.Error != nil {
		return nil, res.Error
	}
	return laws, nil
}
