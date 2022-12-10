package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingHandler(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}

func RootRouter(c *gin.Context) {
	c.String(http.StatusOK, "Hello World")
}

func Favicon(c *gin.Context) {
	c.Status(http.StatusNoContent)
}
