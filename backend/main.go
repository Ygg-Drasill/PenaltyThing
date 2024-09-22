package main

import (
	"fmt"
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/docs"
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/handlers"
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/middleware"
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/repository"
	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"os"
)

var (
	address = os.Getenv("API_BASE_ADDRESS")
)

const (
	basePath = "/api/v1"
)

// @title			PenaltyThing API
// @version		1.0
// @contact.name	Tobias Bay
// @contact.url	http://penaltything.social/support
// @contact.email	tab@penaltything.social
func main() {
	repo := repository.ConnectToDatabase(repository.ConnectionFromEnvironment())
	dbContext := handlers.NewDbContext(repo)
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	docs.SwaggerInfo.Host = address
	docs.SwaggerInfo.BasePath = basePath
	v1 := router.Group(basePath)
	{
		user := v1.Group("/user")
		{
			user.GET("/all", dbContext.GetUsers)
			user.GET("/get", dbContext.GetUser)
			user.GET("/getInfo", dbContext.GetUserInfo)
			user.GET("/getMemberBatch", dbContext.GetUsersMemberBatch)
			user.POST("/register", dbContext.RegisterUser)
			user.POST("/authenticate", dbContext.AuthenticateUser)
		}

		team := v1.Group("/team")
		{
			team.GET("/get", dbContext.GetTeam)
			team.GET("/getByUserId", dbContext.GetTeamsByUserId)
			team.POST("/create", dbContext.CreateTeam)
			team.POST("/addUser", dbContext.AddUserToTeam)
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

		invitation := v1.Group("/invitation")
		{
			invitation.POST("/create", dbContext.CreateInvitation)
			invitation.POST("/accept", dbContext.AcceptInvitation)
		}

		notification := v1.Group("/notification")
		{
			notification.GET("/getFiltered", dbContext.GetNotifications)
		}

		health := v1.Group("/health")
		{
			health.GET("/", dbContext.GetHealth)
			health.GET("/ping", handlers.Ping)
			database := health.Group("/database")
			{
				database.GET("/ping", dbContext.PingDatabase)
				database.GET("/stats", dbContext.GetDatabaseStats)
			}
		}
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	if err := router.Run(fmt.Sprintf(":%s", os.Getenv("LISTEN_PORT"))); err != nil {
		panic(err)
	}
}
