package handlers

import (
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
func (db *DbContext) CreateInvitation(ctx *gin.Context) {
	var request CreateInvitationRequest
	err := ctx.ShouldBind(&request)
	if err != nil {
		ctx.String(http.StatusBadRequest, "Bad invitation request")
	}

	invitation, err := db.repo.CreateInvitation(request.TargetUserId, request.SenderUserId, request.TeamId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Unable to create invitation: "+err.Error())
	}

	ctx.JSON(http.StatusOK, invitation)
}
