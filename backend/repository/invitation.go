package repository

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) CreateInvitation(senderUserId, targetUserId, teamId string) (*models.Invitation, error) {
	newInvitation := &models.Invitation{
		Id:           uuid.New().String(),
		SenderUserId: senderUserId,
		TargetUserId: targetUserId,
		TeamId:       teamId,
	}

	repo.db.Save(newInvitation)
	return newInvitation, nil
}
