package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

type GetFilteredNotificationsRequest struct {
	UserId string                    `json:"userId" form:"userId"`
	Filter []models.NotificationType `json:"filter" form:"filter"`
} //@Name GetFilteredNotificationsRequest

// GetNotificationsFiltered
//
//	@Summary	get notifications for user, given a notification type filter
//	@Id			getFiltered
//	@Schemes
//	@Description	get notifications with filter
//	@Tags			notification
//	@Param			userId	query	string		true	"id"
//	@Param			filter	query	[]string	false	"filter list"
//	@Accept			json
//	@Produce		json
//	@Success		200	{array}		Notification
//	@Router			/notification/getFiltered [get]
func (db *DbContext) GetNotificationsFiltered(ctx *gin.Context) {
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

	if len(request.Filter) == 0 {
		ctx.JSON(http.StatusOK, allNotifications)
	}
}

// DismissNotification
//
//	@Summary	remove one or more notification
//	@Id			dismiss
//	@Schemes
//	@Description	dismiss notifications
//	@Tags			notification
//	@Param			id	query	string	true	"id"
//	@Router			/notification/dismiss [delete]
func (db *DbContext) DismissNotification(ctx *gin.Context) {
	idList := strings.Split(ctx.Query("id"), ",")

	if len(idList) > 0 {
		deletedNotifications, err := db.repo.DeleteNotifications(idList)
		if deletedNotifications != int64(len(idList)) {

		}
		if err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}
	}
	ctx.Status(http.StatusNoContent)
}
