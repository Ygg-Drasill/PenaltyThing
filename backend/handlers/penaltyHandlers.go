package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

type AddPenaltyRequest struct {
	targetUserId string
	issuerUserId string
	lawId        string
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
//	@Success		200	{object}	models.PenaltyEntry
//	@Router			/penalty/add [post]
func (db *DbContext) AddPenalty(ctx *gin.Context) {
	var req AddPenaltyRequest
	if err := ctx.BindJSON(&req); err != nil {
		fmt.Print(err.Error())
	}
	if req.targetUserId == req.targetUserId {
		ctx.String(http.StatusBadRequest, "The target member must be different to the issuer")
		return
	}

	if !db.repo.UserExists(req.issuerUserId) {
		ctx.String(http.StatusBadRequest, "Unable to find existing user with given issuer id")
		return
	}

	if !db.repo.UserExists(req.issuerUserId) {
		ctx.String(http.StatusBadRequest, "Unable to find existing user with given target id")
		return
	}
	law, err := db.repo.GetLawById(req.lawId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	newPenalty := models.PenaltyEntry{
		Id:     uuid.New().String(),
		UserId: req.targetUserId,
		LawId:  law.Id,
		Law:    *law,
		IsNew:  true,
	}
	ctx.JSON(http.StatusOK, newPenalty)
}
