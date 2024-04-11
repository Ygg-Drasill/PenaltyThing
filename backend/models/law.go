package models

type Law struct {
	Id          string `json:"id" gorm:"primarykey"`
	Title       string `json:"title"`
	Description string `json:"description"`
}
