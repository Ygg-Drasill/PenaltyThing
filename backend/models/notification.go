package models

type NotificationType string //@Name NotificationType

const (
	INVITATION NotificationType = "INVITATION"
	PENALTY    NotificationType = "PENALTY"
)

type Notification struct {
	Id         string           `json:"id" binding:"required" gorm:"primary_key"`
	Type       NotificationType `json:"type" binding:"required" gorm:"type:notification_type"`
	Data       []byte           `json:"data" binding:"required"`
	ReceiverId string           `json:"receiverId" binding:"required"`
} //@Name Notification
