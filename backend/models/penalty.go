package models

type PenaltyEntry struct {
	Id     string `json:"id" gorm:"primarykey"`
	UserId string `json:"userId"`
	Law    Law
}
