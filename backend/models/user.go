package models

type User struct {
	Id        string         `json:"id" gorm:"primarykey"`
	Name      string         `json:"name"`
	Password  string         `json:"password"`
	TeamId    string         `json:"teamId"`
	Penalties []PenaltyEntry `json:"penalties"`
}

type Member struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func (user User) ToMember() Member {
	return Member{
		Id:   user.Id,
		Name: user.Name,
	}
}
