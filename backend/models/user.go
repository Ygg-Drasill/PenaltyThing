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
	Id        string         `json:"id"`
	Username  string         `json:"username"`
	FirstName string         `json:"firstName"`
	LastName  string         `json:"lastName"`
	Penalties []PenaltyEntry `json:"penalties"`
} //@name Member

func (user User) ToMember() Member {
	return Member{
		Id:        user.Id,
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}
}
