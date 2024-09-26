package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/authentication"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strings"
)

const hashCost = 14

type RegisterUserRequest struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
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
//	@Param			request	body	RegisterUserRequest	true	"query params"
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
		ctx.String(http.StatusBadRequest, "First and last name must be provided")
		return
	}
	if len(req.Username) == 0 || len(req.Password) == 0 {
		ctx.String(http.StatusBadRequest, "Username and password must be provided")
		return
	}

	if len(req.Email) == 0 {
		ctx.String(http.StatusBadRequest, "Email must be provided")
		return
	}

	if !strings.Contains(req.Email, "@") {
		ctx.String(http.StatusBadRequest, "Email must be provided")
		return
	}

	c := strings.Split(req.Email, "@")
	if len(c) != 2 {
		ctx.String(http.StatusBadRequest, "Email must be provided")
		return
	}

	var err error
	var hash []byte
	hash, err = bcrypt.GenerateFromPassword([]byte(req.Password), hashCost)

	newUser, err := db.repo.AddUser(req.Username, req.Email, string(hash), req.FirstName, req.LastName)
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
//	@Param			id	query	string	true	"User search by id"
//	@Produce		json
//	@Success		200	{object}	UserPublic
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

type GetUserInfoRequest struct {
	Id string `json:"id" form:"id"`
	//TODO: add user token, to validate authenticity
} //@name GetUserInfoRequest

// GetUserInfo
//
//	@Summary	Get user info
//	@Id			getUserInfo
//	@Schemes
//	@Description	get detailed user info
//	@Tags			user
//	@Param			id	query	string	true	"User search by id"
//	@Produce		json
//	@Success		200	{object}	UserInfo
//	@Router			/user/getInfo [get]
func (db *DbContext) GetUserInfo(ctx *gin.Context) {
	var query GetUserInfoRequest
	if res := ctx.ShouldBindQuery(&query); res != nil {
		ctx.String(http.StatusInternalServerError, res.Error())
		return
	}

	user, err := db.repo.GetUserById(query.Id)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, *user.ToUserInfoResponse())
}

// GetUsers godoc
//
//	@Summary		Get all users
//	@Description	Get all users
//	@Tags			user
//	@Accept			json,json-api
//	@Produce		json,json-api
//	@Success		200	{array}		UserPublic
//	@Failure		500	{string}	string	"Internal server error"
//	@Router			/user/all [get]
func (db *DbContext) GetUsers(g *gin.Context) {
	result, err := db.repo.GetUsers()
	if err != nil {
		g.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var users []models.UserPublic
	for _, user := range result {
		users = append(users, *user.ToUserResponse())
	}

	g.JSON(http.StatusOK, users)
}

type GetUsersBatchRequest struct {
	Ids string `json:"ids" form:"ids"`
} //@name GetUsersBatchRequest

// GetUsersMemberBatch
//
//	@Summary	Get public users as batch
//	@Id			getUsersMemberBatch
//	@Schemes
//	@Description	Get public users as batch from list of members
//	@Tags			user
//	@Param			ids	query	string	true	"id list"
//	@Produce		json
//	@Success		200	{array}	UserPublic
//	@Router			/user/getMemberBatch [get]
func (db *DbContext) GetUsersMemberBatch(ctx *gin.Context) {
	var query GetUsersBatchRequest
	if res := ctx.ShouldBindQuery(&query); res != nil {
		ctx.String(http.StatusInternalServerError, res.Error())
	}
	memberIds := strings.Split(query.Ids, ",")

	var users []models.UserPublic
	for _, id := range memberIds {
		user, err := db.repo.GetMemberAsUser(id)
		if err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}
		if user != nil {
			users = append(users, *user)
		}
	}

	ctx.JSON(http.StatusOK, users)
}

type AuthenticateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
} //@name AuthenticateUserRequest

// AuthenticateUser
//
//	@Summary	Authenticate user
//	@Id			authenticateUser
//	@Schemes
//	@Description	Authenticate user using username and password
//	@Tags			user
//	@Param			request	body	AuthenticateUserRequest	true	"User credentials"
//	@Produce		json
//	@Success		200	{object}	UserPublic
//	@Router			/user/authenticate [post]
func (db *DbContext) AuthenticateUser(ctx *gin.Context) {
	var req AuthenticateUserRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	if !authentication.AuthenticatePassword(req.Email, req.Password, db.repo) {
		ctx.String(http.StatusUnauthorized, "Wrong email or password, please try again")
	}

	user, err := db.repo.GetUserByEmail(req.Email)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, user.ToUserResponse())
}
