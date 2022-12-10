//go:build !release
// +build !release

package config

import (
	"bytes"
	"os"
	"strings"

	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigType("YAML") // or viper.SetConfigType("yaml")
	// any approach to require this configuration into your program.
	str, _ := os.Getwd()
	str = strings.Replace(str, "/test", "", 1)
	str = strings.Replace(str, "/controllers", "", 1)
	url := str + "/application.yml"
	data, err := os.ReadFile(url)
	if err != nil {
		panic(err)
	}

	viper.ReadConfig(bytes.NewBuffer(data))
}
