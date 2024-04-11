package handlers

import "github.com/gin-gonic/gin"

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
}

// GetLaws
//
//	@Summary	Get laws
//	@Id			getLaws
//	@Schemes
//	@Description	get all laws in a team by teamId
//	@Tags			law
//	@Param			request body handlers.GetLawsRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	[]models.Law
//	@Router			/law/getAllByTeam [get]
func (db *DbContext) GetLaws(ctx *gin.Context) {

}
