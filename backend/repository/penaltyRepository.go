package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
	"time"
)

func (repo *Repository) AddPenaltyToUser(targetId, issuerId, lawId, comment string) (*models.PenaltyEntry, error) {
	penaltyLaw, err := repo.GetLawById(lawId)
	if err != nil {
		return nil, err
	}
	entry := &models.PenaltyEntry{
		Id:        uuid.New().String(),
		UserId:    targetId,
		IssuedBy:  issuerId,
		LawId:     lawId,
		Law:       *penaltyLaw,
		IsNew:     true,
		CreatedAt: time.Now(),
		Comment:   comment,
	}
	repo.db.Save(entry)
	return entry, nil
}

func (repo *Repository) GetPenaltiesByUserId(userId string) ([]models.PenaltyEntry, error) {
	var penalties []models.PenaltyEntry
	var err error
	err = repo.db.Where("userId = ?", userId).Find(&penalties).Error
	if err != nil {
		return nil, err
	}
	return penalties, nil
}
