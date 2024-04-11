package models

type PenaltyEntry struct {
	Id     string `json:"id" gorm:"primarykey"`
	UserId string `json:"userId" gorm:"foreignkey"`
	LawId  string
	Law    Law  `json:"law" gorm:"foreignkey=lawId"`
	IsNew  bool `json:"isNew"`
}
