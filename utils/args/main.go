package args

import (
	"bytes"
	"encoding/json"
	"io"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

func Param(c *gin.Context, key string) string {
	if c.ContentType() == binding.MIMEJSON {
		bodyBytes, _ := io.ReadAll(c.Request.Body)
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
		var sec map[string]string
		if err := json.Unmarshal(bodyBytes, &sec); err == nil {
			v, exist := sec[key]
			if exist {
				return v
			}
		}
	}
	return c.Request.FormValue(key)
}

func Params(c *gin.Context) map[string]string {
	sec := make(map[string]string)
	if c.ContentType() == binding.MIMEJSON {
		bodyBytes, _ := io.ReadAll(c.Request.Body)
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
		if err := json.Unmarshal(bodyBytes, &sec); err == nil {
			return sec
		}
	}
	for k, v := range c.Request.URL.Query() {
		sec[k] = v[0]
	}
	return sec
}
