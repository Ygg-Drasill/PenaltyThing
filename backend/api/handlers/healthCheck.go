package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

// GetHealth godoc
//
//	@Summary		Health check
//	@Description	Health check
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{string} success message
//	@Router			/health [get]
func GetHealth(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Health check successful",
	})
}

// PingDatabase godoc
//
//	@Summary		Pings the database
//	@Description	Pings the database
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{string} ping time in milliseconds
//	@Failure		500	{string} error message
//	@Router			/health/database/ping [get]
func (db *DbContext) PingDatabase(ctx *gin.Context) {
	startTime := time.Now()
	err := db.repo.VerifyDatabaseConnection()
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Database ping failed",
		})
	}
	elapsedTime := time.Since(startTime)

	ctx.JSON(200, gin.H{
		"message": fmt.Sprintf("Database ping successful in %d ms", elapsedTime.Milliseconds()),
	})
}

// GetDatabaseStats godoc
//
//	@Summary		Gets database stats
//	@Description	Gets database stats
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	sql.DBStats
//	@Failure		500	{string} error message
//	@Router			/health/database/stats [get]
func (db *DbContext) GetDatabaseStats(ctx *gin.Context) {
	stats, err := db.repo.DatabaseStats()
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to get database stats",
		})
	}

	ctx.JSON(200, gin.H{
		"stats": stats,
	})
}
