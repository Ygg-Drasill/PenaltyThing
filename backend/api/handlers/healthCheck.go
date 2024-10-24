package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type HealthCheck struct {
	ServerPingTime   int64
	DatabasePingTime int64
} //@name HealthCheck

// GetHealth godoc
//
//	@Summary		Health check
//	@Description	Health check
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	HealthCheck
//	@Failure		500	{string}	error	message
//	@Router			/health [get]
func (db *DBContext) GetHealth(ctx *gin.Context) {
	startTime := time.Now()
	_, err := http.Get("http://penaltything.social")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Ping to website failed",
		})
		return
	}
	elapsedTime := time.Since(startTime).Milliseconds()

	startTimeDB := time.Now()
	err = db.repo.VerifyDatabaseConnection()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Ping to database failed",
		})
		return
	}
	elapsedTimeDB := time.Since(startTimeDB).Milliseconds()

	ctx.JSON(http.StatusOK, gin.H{
		"Health": HealthCheck{
			ServerPingTime:   elapsedTime,
			DatabasePingTime: elapsedTimeDB,
		},
	})
}

// Ping godoc
//
//	@Summary		Pings penaltything.social
//	@Description	Pings penaltything.social
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{string}	ping	time	in	milliseconds
//	@Failure		500	{string}	error	message
//	@Router			/health/ping [get]
func Ping(ctx *gin.Context) {
	startTime := time.Now()
	_, err := http.Get("http://penaltything.social")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Ping failed",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Ping successful in %d ms", time.Since(startTime).Milliseconds()),
	})
}

// PingDatabase godoc
//
//	@Summary		Pings the database
//	@Description	Pings the database
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{string}	ping	time	in	milliseconds
//	@Failure		500	{string}	error	message
//	@Router			/health/database/ping [get]
func (db *DBContext) PingDatabase(ctx *gin.Context) {
	startTime := time.Now()
	err := db.repo.VerifyDatabaseConnection()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Database ping failed",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Database ping successful in %d ms", time.Since(startTime).Milliseconds()),
	})
}

type DBStats struct {
} //@name DBStats

// GetDatabaseStats godoc
//
//	@Summary		Gets database stats
//	@Description	Gets database stats
//	@Tags			health
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	DBStats
//	@Failure		500	{string}	error	message
//	@Router			/health/database/stats [get]
func (db *DBContext) GetDatabaseStats(ctx *gin.Context) {
	stats, err := db.repo.DatabaseStats()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get database stats",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"stats": *stats,
	})
}
