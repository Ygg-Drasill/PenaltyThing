package repository

import "github.com/Ygg-Drasill/PenaltyThing/backend/models"

func (repo *Repository) CreateInvitationEvent(userId, teamId string) {
	event := models.InvitationEvent{
		Event:  models.Event{},
		TeamId: "",
		UserId: "",
	}

	repo.db.Create()
}
