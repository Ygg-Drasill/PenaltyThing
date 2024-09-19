package repository

import (
	"errors"
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/models"
	"github.com/google/uuid"
)

func (repo *Repository) CreateLaw(teamId, title, description string, cost int) (*models.Law, error) {
	if !repo.TeamExists(teamId) {
		return nil, errors.New(fmt.Sprintf("Unable to find team with id %s", teamId))
	}
	newLaw := &models.Law{
		Id:          uuid.New().String(),
		TeamId:      teamId,
		Title:       title,
		Description: description,
	}
	repo.db.Save(newLaw)
	return newLaw, nil
}

func (repo *Repository) GetLawById(lawId string) (*models.Law, error) {
	var law models.Law
	res := repo.db.Find(&law, "id = ?", lawId)
	if res.Error != nil {
		return nil, res.Error
	}
	return &law, nil
}

func (repo *Repository) GetLawsByTeam(teamId string) ([]models.Law, error) {
	var laws []models.Law
	res := repo.db.Where("team_id = ?", teamId).Find(&laws)
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
