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

func (repo *Repository) InvitationExists(id string) bool {
	var exists bool
	repo.db.Raw("SELECT EXISTS(SELECT FROM invitations WHERE id = ?)", id).Scan(&exists)
	return exists
}

func (repo *Repository) GetInvitationById(id string) (*models.Invitation, error) {
	var invitation models.Invitation
	res := repo.db.Find(&invitation, "id = ?", id)
	return &invitation, res.Error
}

func (repo *Repository) DeleteInvitation(id string) error {
	res := repo.db.Delete(&models.Invitation{Id: id})
	if res.Error != nil {
		return res.Error
	}
	return nil
}
