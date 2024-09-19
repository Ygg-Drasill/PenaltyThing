package models

type Law struct {
	Id          string `json:"id" gorm:"primarykey"`
	TeamId      string `json:"teamId"`
	Title       string `json:"title"`
	Description string `json:"description"`
} //@name Law

type LawProposal struct {
	Id string `json:"id" gorm:"primarykey"`
} //@name Law
