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

func (repo *Repository) UpdateLaw(law models.Law) error {
	res := repo.db.Save(&law)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (repo *Repository) DeleteLawById(lawId string) error {
	res := repo.db.Delete(&models.Law{}, lawId)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
