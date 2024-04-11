package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AddPenaltyRequest struct {
	targetUserId string
	issuerUserId string
}

// AddPenalty
//
//	@Summary	Add penalty to team member
//	@Id			addUser
//	@Schemes
//	@Description	register new user
//	@Tags			penalty
//	@Param			request	body	handlers.AddPenaltyRequest	true	"query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.User
//	@Router			/addPenalty [post]
func (db *DbContext) AddPenalty(ctx *gin.Context) {
	req := AddPenaltyRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		fmt.Print(err.Error())
	}
	if req.targetUserId == req.targetUserId {
		ctx.String(http.StatusBadRequest, "The target member must be different to the issuer")
		return
	}
	//TODO: register penalty
}
