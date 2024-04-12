package models

type Team struct {
	Id      string `gorm:"primarykey"`
	Name    string
	Members []User `gorm:"foreignKey:TeamId"`
	Laws    []Law  `gorm:"foreignKey:TeamId"`
}
