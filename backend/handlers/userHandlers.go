package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type RegisterUserRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// RegisterUser
//
//	@Summary	Add user
//	@Id			registerUser
//	@Schemes
//	@Description	register new user
//	@Tags			user
//	@Param			request body handlers.RegisterUserRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.User
//	@Router			/user/register [post]
func (db *DbContext) RegisterUser(ctx *gin.Context) {
	req := RegisterUserRequest{}
	err := ctx.BindJSON(&req)
	fmt.Printf("User by name %s added", req.Name)
	err = db.repo.AddUser(req.Name, req.Password)
	if err != nil {
		fmt.Println(err)
	}
	ctx.JSON(http.StatusOK, "User added")
}

type GetUserRequest struct {
	Id string `json:"id"`
}

// GetUser
//
//	@Summary	Get user
//	@Id			getUser
//	@Schemes
//	@Description	get user
//	@Tags			user
//	@Param			request body handlers.RegisterUserRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.Member
//	@Router			/getUser [get]
func (db *DbContext) GetUser(ctx *gin.Context) {
	req := GetUserRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		fmt.Println(err)
	}
	user := db.repo.GetUserById(req.Id)
	ctx.JSON(http.StatusOK, user.ToMember())
}
