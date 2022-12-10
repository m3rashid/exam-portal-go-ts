//go:build release
// +build release

package config

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
	viper.AutomaticEnv()
}
