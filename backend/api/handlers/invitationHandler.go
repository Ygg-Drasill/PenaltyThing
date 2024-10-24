package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateInvitationRequest struct {
	SenderUserId string `json:"senderUserId"`
	TargetUserId string `json:"targetUserId"`
	TeamId       string `json:"teamId"`
} //@name CreateInvitationRequest

// CreateInvitation
//
//	@Summary	Create new invitation
//	@Id			createInvitation
//	@Schemes
//	@Description	create invitation
//	@Tags			invitation
//	@Param			request body CreateInvitationRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200 {string} success
//	@Router			/invitation/create [post]
func (db *DBContext) CreateInvitation(ctx *gin.Context) {
	var request CreateInvitationRequest
	err := ctx.ShouldBind(&request)
	if err != nil {
		ctx.String(http.StatusBadRequest, "Bad invitation request")
	}

	invitation, err := db.repo.CreateInvitation(request.SenderUserId, request.TargetUserId, request.TeamId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Unable to create invitation: "+err.Error())
		return
	}

	db.repo.CreateNotification(request.TargetUserId, models.INVITATION, []byte(invitation.Id))

	ctx.JSON(http.StatusOK, invitation)
}

type AcceptInvitationRequest struct {
	UserId         string `json:"userId"`
	InvitationId   string `json:"invitationId"`
	NotificationId string `json:"notificationId"`
} //@name AcceptInvitationRequest

// AcceptInvitation
//
//	@Summary	Accept an invitation, if it exists
//	@Id			acceptInvitation
//	@Schemes
//	@Description	accept invitation
//	@Tags			invitation
//	@Param			request body AcceptInvitationRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200 {string} success
//	@Router			/invitation/accept [post]
func (db *DBContext) AcceptInvitation(ctx *gin.Context) {
	var request *AcceptInvitationRequest
	err := ctx.ShouldBindJSON(&request)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	if !db.repo.InvitationExists(request.InvitationId) {
		ctx.String(http.StatusBadRequest, "user is not invited to team")
		return
	}

	invitation, err := db.repo.GetInvitationById(request.InvitationId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	if request.UserId != invitation.TargetUserId {
		ctx.String(http.StatusBadRequest, "wrong user in invitation")
		return

	}

	err = db.repo.AddUserToTeam(request.UserId, invitation.TeamId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	err = db.repo.DeleteInvitation(request.InvitationId)
	err = db.repo.DeleteNotification(request.NotificationId)

	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.String(http.StatusOK, "You have been added to the team")
}
