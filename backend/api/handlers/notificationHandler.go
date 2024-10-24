package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type GetFilteredNotificationsRequest struct {
	UserId string                    `json:"userId" form:"userId"`
	Filter []models.NotificationType `json:"filter" form:"filter"`
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

	allNotifications, err := db.repo.GetNotificationsByUserId(request.UserId)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	if len(allNotifications) == 0 {
		ctx.String(http.StatusNoContent, "no notifications found for this user: "+request.UserId)
		return
	}

	if len(request.Filter) == 0 {
		ctx.JSON(http.StatusOK, allNotifications)
	}
}
