package models

import (
	"time"
)

type Event struct {
	Id        string    `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt"`
	ExpiresAt time.Time `json:"expiresAt"`
}

type InvitationEvent struct {
	Event
	TeamId string `json:"teamId"`
	UserId string `json:"userId"`
}

type PenaltyEvent struct {
	Event
	TeamId string `json:"teamId"`
	LawId  string `json:"lawId"`
	UserId string `json:"userId"`
}
