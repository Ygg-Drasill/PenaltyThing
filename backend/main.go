package main

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/docs"
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http"
)

//	@BasePath	/api/v1

// PingExample godoc
//
//	@Summary	Monkey example
//	@Schemes
//	@Description	testtesttest
//	@Tags			example
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.User
//	@OperationId	helloWorld
//	@Router			/example/helloworld [get]
func Helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, models.User{})
}

func main() {
	_, err := gorm.Open(postgres.Open("postgres://apidev:1234@130.225.37.183:5432/penaltythingdb"))
	if err != nil {
		fmt.Println(err)
	}
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/api/v1"
	v1 := r.Group("/api/v1")
	{
		eg := v1.Group("/example")
		{
			eg.GET("/helloworld", Helloworld)
		}
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	r.Run(":8080")

}
