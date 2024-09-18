package repository

import (
	"errors"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/google/uuid"
)

func (repo *Repository) CreateNotification(receiverId string, notificationType models.NotificationType, data []byte) {
	notification := &models.Notification{
		Id:         uuid.New().String(),
		Type:       notificationType,
		Data:       data,
		ReceiverId: receiverId,
	}

	repo.db.Save(notification)
}

func (repo *Repository) GetNotificationsByUserId(userId string) ([]models.Notification, error) {
	notifications := make([]models.Notification, 0)

	if !repo.UserExists(userId) {
		return nil, errors.New("user does not exist")
	}

	if result := repo.db.Find(&notifications, "receiver_id = ?", userId); result.Error != nil {
		return nil, result.Error
	}

	return notifications, nil
}
