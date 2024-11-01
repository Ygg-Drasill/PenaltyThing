package models

type Team struct {
	Id      string       `json:"id" gorm:"primarykey"`
	Name    string       `json:"name" gorm:"unique;not null"`
	Members []TeamMember `json:"members" gorm:"foreignKey:TeamId"`
	Laws    []Law        `json:"law" gorm:"foreignKey:TeamId"`
} //@name Team
