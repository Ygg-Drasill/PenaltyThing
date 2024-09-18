package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AddPenaltyRequest struct {
	TargetUserId string `json:"targetUserId"`
	IssuerUserId string `json:"issuerUserId"`
	LawId        string `json:"lawId"`
	Comment      string `json:"comment"`
} //@name AddPenaltyRequest

// AddPenalty
//
//	@Summary	Add penalty to team member
//	@Id			addPenalty
//	@Schemes
//	@Description	Add penalty to member of team
//	@Tags			penalty
//	@Param			request	body	AddPenaltyRequest	true	"query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	PenaltyEntry
//	@Router			/penalty/add [post]
func (db *DbContext) AddPenalty(ctx *gin.Context) {
	var req AddPenaltyRequest
	if err := ctx.BindJSON(&req); err != nil {
		fmt.Print(err.Error())
	}

	if !db.repo.UserExists(req.IssuerUserId) {
		ctx.String(http.StatusBadRequest, "Unable to find existing user with given issuer id")
		return
	}

	if !db.repo.UserExists(req.IssuerUserId) {
		ctx.String(http.StatusBadRequest, "Unable to find existing user with given target id")
		return
	}

	newPenaltyEntry, err := db.repo.AddPenaltyToUser(req.TargetUserId, req.IssuerUserId, req.LawId, req.Comment)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	db.repo.CreateNotification(req.TargetUserId, models.PENALTY, []byte(newPenaltyEntry.Id))
	ctx.JSON(http.StatusOK, newPenaltyEntry)
}
