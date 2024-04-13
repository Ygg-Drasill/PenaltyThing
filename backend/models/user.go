package models

type User struct {
	Id           string         `json:"id" gorm:"primarykey"`
	Name         string         `json:"name"`
	PasswordHash string         `json:"password"`
	TeamId       string         `json:"teamId" gorm:"default:null"`
	Penalties    []PenaltyEntry `json:"penalties"`
} //@name User

type Member struct {
	Id        string         `json:"id"`
	Name      string         `json:"name"`
	Penalties []PenaltyEntry `json:"penalties"`
} //@name Member

func (user User) ToMember() Member {
	return Member{
		Id:   user.Id,
		Name: user.Name,
	}
}
