package middlewares

import (
	"net/http"
	"strings"

	"github.com/m3rashid/exam-portal/controllers"
	"github.com/m3rashid/exam-portal/utils/helpers"
	"github.com/m3rashid/exam-portal/utils/jwt"

	"github.com/gin-gonic/gin"
)

func Auth(scopes []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		bear := c.Request.Header.Get("Authorization")
		token := strings.Replace(bear, "Bearer ", "", 1)
		sub, tokenScope, err := jwt.Decoder(token)
		if err != nil {
			c.Abort()
			c.String(http.StatusUnauthorized, err.Error())
		} else {
			if !helpers.Contains(scopes, tokenScope) {
				controllers.StatusError(c, http.StatusUnauthorized, "unauthorized", "invalid scope")
				c.Abort()

			}

			c.Set("sub", sub)
			c.Set("scope", tokenScope)
			c.Next()
		}
	}
}
