package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

const hashCost = 14

type RegisterUserRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// RegisterUser
//
//	@Summary	Register user
//	@Id			registerUser
//	@Schemes
//	@Description	Register new user, given password will be encrypted on backend. This is subject to change
//	@Tags			user
//	@Param			request body handlers.RegisterUserRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.User
//	@Router			/user/register [post]
func (db *DbContext) RegisterUser(ctx *gin.Context) {
	req := RegisterUserRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	var err error
	var hash []byte
	hash, err = bcrypt.GenerateFromPassword([]byte(req.Password), hashCost)

	newUser, err := db.repo.AddUser(req.Name, string(hash))
	if err != nil {
		fmt.Println(err)
		ctx.String(http.StatusInternalServerError, err.Error())
	}
	ctx.JSON(http.StatusOK, newUser)
}

type GetUserRequest struct {
	Id string `json:"id" form:"id"`
}

// GetUser
//
//	@Summary	Get user
//	@Id			getUser
//	@Schemes
//	@Description	get user
//	@Tags			user
//	@Param			id query string true "User search by id"
//	@Produce		json
//	@Success		200	{object} models.Member
//	@Router			/user/get [get]
func (db *DbContext) GetUser(ctx *gin.Context) {
	query := GetUserRequest{}
	if res := ctx.ShouldBindQuery(&query); res != nil {
		ctx.String(http.StatusInternalServerError, res.Error())
		return
	}

	user, err := db.repo.GetUserById(query.Id)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
	}
	ctx.JSON(http.StatusOK, user.ToMember())
}
