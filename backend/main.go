package main

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/docs"
	"github.com/Ygg-Drasill/PenaltyThing/backend/handlers"
	"github.com/Ygg-Drasill/PenaltyThing/backend/middleware"
	"github.com/Ygg-Drasill/PenaltyThing/backend/repository"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

const (
	address  = "localhost:9000"
	basePath = "/api/v1"
)

// @title			PenaltyThing API
// @version		1.0
// @contact.name	Tobias Bay
// @contact.url	http://penaltything.me/support
// @contact.email	tab@penaltything.social
func main() {
	repo := repository.ConnectToDatabase("postgres://apidev:1234@130.225.37.183:5432/penaltythingdb")
	dbContext := handlers.NewDbContext(repo)
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	docs.SwaggerInfo.Host = address
	docs.SwaggerInfo.BasePath = basePath
	v1 := router.Group(basePath)
	{
		user := v1.Group("/user")
		{
			user.GET("/get", dbContext.GetUser)
			user.POST("/register", dbContext.RegisterUser)
		}

		team := v1.Group("/team")
		{
			team.POST("/create", dbContext.CreateTeam)
		}

		law := v1.Group("/law")
		{
			law.GET("/getByTeam", dbContext.GetLaws)
			law.POST("/create", dbContext.CreateLaw)
		}

		penalty := v1.Group("/penalty")
		{
			penalty.POST("/add", dbContext.AddPenalty)
		}
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	if err := router.Run(":9000"); err != nil {
		panic(err)
	}
}
