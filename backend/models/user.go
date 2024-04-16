package models

type User struct {
	Id           string         `json:"id" gorm:"primarykey"`
	Username     string         `json:"username"`
	PasswordHash string         `json:"password"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	TeamId       string         `json:"teamId" gorm:"default:null"`
	Penalties    []PenaltyEntry `json:"penalties"`
} //@name User

type Member struct {
	Id     string `json:"id"`
	UserId string `json:"userId"`
	TeamId string `json:"teamId"`
} //@name Member
