package models

type User struct {
	Id            string         `json:"id" gorm:"primarykey" gorm:"unique"`
	Username      string         `json:"username" gorm:"unique"`
	Email         string         `json:"email" gorm:"unique"`
	Status        string         `json:"status"`
	PasswordHash  string         `json:"password"`
	FirstName     string         `json:"firstName"`
	LastName      string         `json:"lastName"`
	Penalties     []PenaltyEntry `json:"penalties"`
	TeamMembers   []TeamMember   `json:"teamMembers" gorm:"foreignkey:UserId"`
	Notifications []Notification `json:"notifications" gorm:"foreignkey:ReceiverId"`
} //@name User

type UserInfo struct {
	Id        string `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Status    string `json:"status"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
} //@name UserInfo

type UserPublic struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Status   string `json:"status"`
} //@name UserPublic

func (user User) ToUserInfoResponse() *UserInfo {
	return &UserInfo{
		Id:        user.Id,
		Username:  user.Username,
		Status:    user.Status,
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}
}

func (user User) ToUserResponse() *UserPublic {
	return &UserPublic{
		Id:       user.Id,
		Username: user.Username,
		Status:   user.Status,
	}
}
