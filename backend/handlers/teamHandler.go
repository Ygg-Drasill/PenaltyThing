package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateTeamRequest struct {
	UserId string `json:"userId"`
	Name   string `json:"name"`
} //@name CreateTeamRequest

// CreateTeam
//
//	@Summary	Create new team
//	@Id			createTeam
//	@Schemes
//	@Description	Create a new team
//	@Tags			team
//	@Param			request	body	CreateTeamRequest	true	"query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	Team
//	@Router			/team/create [post]
func (db *DbContext) CreateTeam(ctx *gin.Context) {
	req := CreateTeamRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	var err error
	var newTeam *models.Team
	newTeam, err = db.repo.AddTeam(req.Name)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	err = db.repo.AddUserToTeam(req.UserId, newTeam.Id)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, *newTeam)
}

type AddUserToTeamRequest struct {
	userId string
	teamId string
} //@name AddUserToTeamRequest

// AddUserToTeam
//
//	@Summary	Add user to team
//	@Id			addUserToTeam
//	@Schemes
//	@Description	Add user to team
//	@Tags			team
//	@Param			request	body	AddUserToTeamRequest	true	"request params"
//	@Produce		json
//	@Success		200	{object}	Team
//	@Router			/team/addUserToTeam [post]
func (db *DbContext) AddUserToTeam(ctx *gin.Context) {
	var req AddUserToTeamRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	if !db.repo.TeamExists(req.teamId) {
		ctx.String(http.StatusNotFound, "team does not exist")
		return
	}

	if !db.repo.UserExists(req.userId) {
		ctx.String(http.StatusNotFound, "user does not exist")
		return
	}

	if err := db.repo.AddUserToTeam(req.userId, req.teamId); err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.String(http.StatusOK, fmt.Sprintf("Added user %s to team %s", req.userId, req.teamId))
}

// GetTeamsByUserId
//
//	@Summary	Get teams by user id
//	@Id			getTeamsByUserId
//	@Schemes
//	@Description	Get all teams that a user is a member of
//	@Tags			team
//	@Param			userId	query	string	true	"User ID"
//	@Produce		json
//	@Success		200	{array}	Team
//	@Router			/team/getByUserId [get]
func (db *DbContext) GetTeamsByUserId(ctx *gin.Context) {
	var userId string
	var teams []models.Team
	var err error
	userId = ctx.Query("userId")
	if !db.repo.UserExists(userId) {
		ctx.String(http.StatusNotFound, "User not found")
		return
	}
	teams, err = db.repo.GetTeamsByUserId(userId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, teams)
}
