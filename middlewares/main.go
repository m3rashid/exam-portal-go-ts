package middlewares

import (
	"net/http"
	"strings"

	"github.com/m3rashid/exam-portal/controllers"
	"github.com/m3rashid/exam-portal/utils/jwt"

	"github.com/gin-gonic/gin"
)

// 中间件 验证token scp传入用户类型
func Auth(scp string) gin.HandlerFunc {
	return func(c *gin.Context) {
		bear := c.Request.Header.Get("Authorization")
		token := strings.Replace(bear, "Bearer ", "", 1)
		sub, scope, err := jwt.Decoder(token)
		if err != nil {
			c.Abort()
			c.String(http.StatusUnauthorized, err.Error())
		} else {
			if scope != scp {
				controllers.StatusError(c, http.StatusUnauthorized, "unauthorized", "invalid scope")
				c.Abort()
			}
			c.Set("sub", sub)
			c.Set("scp", scope)
			c.Next()
		}
	}
}
