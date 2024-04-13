package models

import "time"

type PenaltyEntry struct {
	Id        string `json:"id" gorm:"primarykey"`
	UserId    string `json:"userId" gorm:"foreignkey"`
	IssuedBy  string `json:"issuedBy"`
	LawId     string
	Law       Law  `json:"law" gorm:"foreignkey=lawId"`
	IsNew     bool `json:"isNew" gorm:"default=true"`
	CreatedAt time.Time
	Comment   string `json:"comment"`
}
