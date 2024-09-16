package handlers

import (
	"github.com/gin-gonic/gin"
)

type CreateInvitationRequest struct {
} //@name CreateInvitationRequest

// CreateInvitation
//
//	@Summary	Create new invitation
//	@Id			createInvitation
//	@Schemes
//	@Description	create law
//	@Tags			invitation
//	@Param			request body CreateInvitationRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	Law
//	@Router			/invitation/create [post]
func (db *DbContext) CreateInvitation(ctx *gin.Context) {

}
