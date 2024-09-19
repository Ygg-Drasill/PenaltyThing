package handlers

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/authentication"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"strings"
	"time"
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
func (db *DBContext) RegisterUser(ctx *gin.Context) {
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
func (db *DBContext) GetUser(ctx *gin.Context) {
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
func (db *DBContext) GetUsers(ctx *gin.Context) {
	result, err := db.repo.GetUsers()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var users []models.UserPublic
	for _, user := range result {
		users = append(users, *user.ToUserResponse())
	}

	ctx.JSON(http.StatusOK, users)
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
func (db *DBContext) GetUsersMemberBatch(ctx *gin.Context) {
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
	ctx.JSON(http.StatusOK, gin.H{"users": users})
}

type AuthenticateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
} //@name AuthenticateUserRequest

// LoginUser
//
//	@Summary	Login user
//	@Id			loginUser
//	@Schemes
//	@Description	Login User and set cookie with JWT token. Token expires in 24 hours.
//	@Tags			user
//	@Param			request	body	AuthenticateUserRequest	true	"User credentials"
//	@Produce		json
//	@Success		200	{object} UserPublic
//	@Router			/user/login [post]
func (db *DBContext) LoginUser(ctx *gin.Context) {
	var req AuthenticateUserRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	if !authentication.AuthenticatePassword(req.Email, req.Password, db.repo) {
		ctx.String(http.StatusUnauthorized, "Wrong username or password, please try again")
	}

	user, err := db.repo.GetUserByEmail(req.Email)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": user.Username,
		"exp":  time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie("token", tokenString, 3600*24, "", "", false, true)

	ctx.JSON(http.StatusOK, user.ToUserResponse())
}

// AuthenticateUser godoc
//
//	@Summary		Authenticate user
//	@Description	Authenticate user
//	@Tags			user
//	@Accept			json,json-api
//	@Produce		json,json-api
//	@Success		200	{string}	string	"Authenticated"
//	@Router			/user/authenticate [get]
func AuthenticateUser(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"message": "Authenticated"})
}
