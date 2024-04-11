package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

type CreateTeamRequest struct {
	UserId string `json:"userId"`
	Name   string `json:"name"`
}

// CreateTeam
// @Summary	Create new team
// @Id			createTeam
// @Schemes
// @Description	Create a new team
// @Tags			team
// @Param			request body handlers.CreateTeamRequest true "query params"
// @Accept			json
// @Produce		json
// @Success		200	{object}	models.Team
// @Router			/team/create [post]
func (db *DbContext) CreateTeam(ctx *gin.Context) {
	req := CreateTeamRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		fmt.Println(err.Error())
	}
	newTeam := models.Team{
		Id:      uuid.New().String(),
		Name:    req.Name,
		Members: make([]models.User, 0),
	}
	requestingUser := db.repo.GetUserById(req.UserId)
	newTeam.Members = append(newTeam.Members, requestingUser)
	ctx.JSON(http.StatusOK, newTeam)
}
