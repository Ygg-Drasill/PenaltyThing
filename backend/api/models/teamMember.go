package models

type TeamMember struct {
	Id     string `json:"id" gorm:"primarykey"`
	UserId string `json:"userId"`
	TeamId string `json:"teamId"`
} //@name TeamMember
