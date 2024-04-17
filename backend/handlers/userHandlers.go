package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/authentication"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

const hashCost = 14

type RegisterUserRequest struct {
	Name      string `json:"name"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
} //@name RegisterUserRequest

// RegisterUser
//
//	@Summary	Register user
//	@Id			registerUser
//	@Schemes
//	@Description	Register new user, given password will be encrypted on backend. This is subject to change
//	@Tags			user
//	@Param			request body RegisterUserRequest true "query params"
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	User
//	@Router			/user/register [post]
func (db *DbContext) RegisterUser(ctx *gin.Context) {
	req := RegisterUserRequest{}
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	if len(req.FirstName) == 0 || len(req.LastName) == 0 {
		ctx.String(http.StatusBadRequest, "Missing fields")
		return
	}
	if len(req.Name) == 0 || len(req.Password) == 0 {
		ctx.String(http.StatusBadRequest, "Username and password must be provided")
		return
	}

	var err error
	var hash []byte
	hash, err = bcrypt.GenerateFromPassword([]byte(req.Password), hashCost)

	newUser, err := db.repo.AddUser(req.Name, string(hash), req.FirstName, req.LastName)
	if err != nil {
		fmt.Println(err)
		ctx.String(http.StatusInternalServerError, err.Error())
	}
	ctx.JSON(http.StatusOK, newUser)
}

type GetUserRequest struct {
	Id string `json:"id" form:"id"`
} //@name GetUserRequest

// GetUser
//
//	@Summary	Get user
//	@Id			getUser
//	@Schemes
//	@Description	get user
//	@Tags			user
//	@Param			id query string true "User search by id"
//	@Produce		json
//	@Success		200	{object} UserPublic
//	@Router			/user/get [get]
func (db *DbContext) GetUser(ctx *gin.Context) {
	var query GetUserRequest
	if res := ctx.ShouldBindQuery(&query); res != nil {
		ctx.String(http.StatusInternalServerError, res.Error())
		return
	}

	user, err := db.repo.GetUserById(query.Id)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, *user.ToUserResponse())
}

type AuthenticateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
} //@name AuthenticateUserRequest

// AuthenticateUser
//
//	@Summary	Authenticate user
//	@Id			authenticateUser
//	@Schemes
//	@Description	Authenticate user using username and password
//	@Tags			user
//	@Param			request body AuthenticateUserRequest true "User credentials"
//	@Produce		json
//	@Success		200	{object} UserPublic
//	@Router			/user/authenticate [post]
func (db *DbContext) AuthenticateUser(ctx *gin.Context) {
	var req AuthenticateUserRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	if !authentication.AuthenticatePassword(req.Username, req.Password, db.repo) {
		ctx.String(http.StatusUnauthorized, "Wrong username or password, please try again")
	}

	user, err := db.repo.GetUserByUsername(req.Username)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, user.ToUserResponse())
}
