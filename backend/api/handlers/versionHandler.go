package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type VersionNumber string

func NewVersionNumber(major, minor, patch int) VersionNumber {
	return VersionNumber(fmt.Sprintf("%d.%d.%d", major, minor, patch))
}

// GetVersion
//
//	@Summary	Get version
//	@Id			getVersion
//	@Schemes
//	@Description	get current version based on backend
//	@Tags			version
//	@Produce		plain
//	@Success		200	{string} ok
//	@Router			/version [get]
func (versionNumber VersionNumber) GetVersion(ctx *gin.Context) {
	ctx.String(http.StatusOK, string(versionNumber))
}
