package models

type Team struct {
	Id      string `gorm:"primarykey"`
	Name    string
	Members []User `gorm:"foreignkey:TeamId"`
	Laws    []Law  `gorm:"foreignkey:TeamId"`
}
