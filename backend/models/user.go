package models

type User struct {
	Id           string         `json:"id" gorm:"primarykey" gorm:"unique"`
	Username     string         `json:"username" gorm:"unique"`
	Email        string         `json:"email" gorm:"unique"`
	Status       string         `json:"status"`
	PasswordHash string         `json:"password"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	Penalties    []PenaltyEntry `json:"penalties"`
	TeamMembers  []TeamMember   `json:"teamMembers" gorm:"foreignkey:UserId"`
} //@name User

type UserPublic struct {
	Id       string `json:"id"`
	UserName string `json:"userName"`
	Status   string `json:"status"`
} //@name UserPublic

func (user User) ToUserResponse() *UserPublic {
	return &UserPublic{
		Id:       user.Id,
		UserName: user.Username,
		Status:   user.Status,
	}
}
