package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateLawRequest struct {
}

// CreateLaw
//
//	@Summary	Create new law
//	@Id			createLaw
//	@Schemes
//	@Description	create law
//	@Tags			law
//	@Param			request body handlers.CreateLawRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	[]models.Law
//	@Router			/law/create [post]
func (db *DbContext) CreateLaw(ctx *gin.Context) {

}

type GetLawsRequest struct {
	TeamId string `json:"teamId" form:"teamId"`
}

// GetLaws
//
//	@Summary	Get laws
//	@Id			getLaws
//	@Schemes
//	@Description	get all laws in a team by teamId
//	@Tags			law
//	@Param			teamId query string true "Team ID"
//	@Produce		json
//	@Success		200	{array}	models.Law
//	@Router			/law/getLawsByTeam [get]
func (db *DbContext) GetLaws(ctx *gin.Context) {
	var query GetLawsRequest
	if err := ctx.ShouldBindQuery(&query); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	laws, err := db.repo.GetLawsByTeam(query.TeamId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
	}
	ctx.JSON(http.StatusOK, laws)
}
