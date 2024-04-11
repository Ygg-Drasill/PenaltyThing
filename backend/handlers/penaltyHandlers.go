package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

// AddPenalty
// @Summary	Add penalty to team member
// @Id			addUser
// @Schemes
// @Description	register new user
// @Tags			penalty
// @Accept			json
// @Produce		json
// @Success		200	{object}	models.User
// @Router			/addPenalty [post]
func (db *DbContext) AddPenalty(ctx *gin.Context) {
	fmt.Println("adding user!")
}
