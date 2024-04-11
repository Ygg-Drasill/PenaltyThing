package main

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/docs"
	"github.com/Ygg-Drasill/PenaltyThing/backend/handlers"
	"github.com/Ygg-Drasill/PenaltyThing/backend/repository"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	repo := repository.ConnectToDatabase("postgres://apidev:1234@130.225.37.183:5432/penaltythingdb")
	dbContext := handlers.NewDbContext(repo)
	router := gin.Default()
	docs.SwaggerInfo.BasePath = "/api/v1"
	v1 := router.Group("/api/v1")
	{
		user := v1.Group("/user")
		{
			user.GET("/get", dbContext.GetUser)
			user.POST("/register", dbContext.RegisterUser)
		}
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	router.Run(":9000")
}
