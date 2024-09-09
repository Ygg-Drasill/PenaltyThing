package middleware

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/repository"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"time"
)

// AuthenticateUser godoc
//
//	@Summary		AuthenticateUser
//	@Description	AuthenticateUser
//	@Tags			user
//	@Accept			json,json-api
//	@Produce		json,json-api
//	@Success		200	{string}	string	"Authenticated"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/user/authenticate [get]
func AuthenticateUser(repo repository.Repository) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie("token")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized[1]: " + err.Error()})
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized[2]: " + err.Error()})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			if float64(time.Now().Unix()) > claims["exp"].(float64) {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized[3]: Token expired"})
				return
			}

			user, err := repo.GetUserClaim(claims)
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized[4]: " + err.Error()})
				return
			}
			ctx.Set("user", user)
			ctx.Next()
		} else {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized[5]: Invalid token"})
			return
		}
	}
}
