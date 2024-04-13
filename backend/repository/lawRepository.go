package repository

import "github.com/Ygg-Drasill/PenaltyThing/backend/models"

func (repo *Repository) GetLawById(lawId string) (*models.Law, error) {
	var law *models.Law
	res := repo.db.First(law, "id = ?", lawId)
	if res.Error != nil {
		return nil, res.Error
	}
	return law, nil
}

func (repo *Repository) GetLawsByTeam(teamId string) ([]models.Law, error) {
	var laws []models.Law
	res := repo.db.Where("teamId = ?", teamId).Find(&laws)
	if res.Error != nil {
		return nil, res.Error
	}
	return laws, nil
}
