package models

type notificationType string

const (
	INVITATION notificationType = "INVITATION"
	PENALTY    notificationType = "PENALTY"
)

type Notification struct {
	Id         string           `json:"id" binding:"required" gorm:"primary_key"`
	Type       notificationType `json:"type" binding:"required" gorm:"type:notification_type"`
	Data       []byte           `json:"data" binding:"required"`
	RecieverId string           `json:"recieverId" binding:"required"`
}
