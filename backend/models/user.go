package models

type User struct {
	Id            string         `json:"id" gorm:"primarykey"`
	Username      string         `json:"username"`
	PasswordHash  string         `json:"password"`
	FirstName     string         `json:"firstName"`
	LastName      string         `json:"lastName"`
	Penalties     []PenaltyEntry `json:"penalties"`
	TeamMembers   []TeamMember   `json:"teamMembers" gorm:"foreignkey:UserId"`
	Notifications []Notification `json:"notifications" gorm:"foreignkey:RecieverId"`
} //@name User

type UserPublic struct {
	Id        string `json:"id"`
	UserName  string `json:"userName"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
} //@name UserPublic

func (user User) ToUserResponse() *UserPublic {
	return &UserPublic{
		Id:        user.Id,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}
}
