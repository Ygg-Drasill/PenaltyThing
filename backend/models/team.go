package models

type Team struct {
	Id      string `gorm:"primarykey"`
	Name    string
	Members []TeamMember `gorm:"foreignKey:TeamId"`
	Laws    []Law        `gorm:"foreignKey:TeamId"`
} //@name Team
