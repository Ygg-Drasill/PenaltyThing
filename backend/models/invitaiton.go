package models

type Invitation struct {
	Id           string `json:"id" gorm:"primarykey"`
	SenderUserId string `json:"senderUserId"`
	TargetUserId string `json:"targetUserId"`
	TeamId       string `json:"teamId"`
} //@ Invitation

type InvitationInfo struct {
	InvitationId   string `json:"invitationId"`
	TeamName       string `json:"teamName"`
	SenderUsername string `json:"senderName"`
} //@ InvitationInfo
