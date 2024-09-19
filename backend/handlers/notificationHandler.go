package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type GetFilteredNotificationsRequest struct {
	UserId string                    `json:"userId"`
	Filter []models.NotificationType `json:"filter"`
} //@Name GetFilteredNotificationsRequest

// GetNotifications
//
//	@Summary	get notifications for user, given a notification type filter
//	@Id			getFiltered
//	@Schemes
//	@Description	get notifications with filter
//	@Tags			notification
//	@Param			userId	query	string		true	"id"
//	@Param			filter	query	[]string	true	"filter list"
//	@Accept			json
//	@Produce		json
//	@Success		200	{array}	Notification
//	@Router			/notification/getFiltered [get]
func (db *DBContext) GetNotifications(ctx *gin.Context) {
	var request GetFilteredNotificationsRequest
	err := ctx.ShouldBindQuery(&request)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	notifications, err := db.repo.GetNotificationsByUserId(request.UserId)

	if len(notifications) == 0 {
		ctx.String(http.StatusNoContent, "no notifications found for user: "+request.UserId)
		return
	}

	ctx.JSON(http.StatusOK, notifications)
}
