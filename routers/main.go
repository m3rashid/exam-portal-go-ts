package routers

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/m3rashid/exam-portal/controllers"
	"github.com/m3rashid/exam-portal/middlewares"
	"github.com/m3rashid/exam-portal/models"
	"github.com/m3rashid/exam-portal/utils/config"
)

func InitRouter(sig ...os.Signal) {
	router := SetupRouter()

	if len(sig) == 0 {
		sig = []os.Signal{syscall.SIGINT, syscall.SIGTERM}
	}

	signalChan := make(chan os.Signal, 1)

	go func() {
		router.Run(fmt.Sprintf(":%v", config.GetEnv("HTTP_PORT")))
	}()
	signal.Notify(signalChan, sig...)
}

func SetupRouter() *gin.Engine {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.ExposeHeaders = []string{"Authorization"}
	config.AllowCredentials = true
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	auth := router.Group("/auth")              // auth required for all
	trainee := router.Group("/trainee")        // auth required for trainee
	trainer := router.Group("/trainer")        // auth required for trainer
	admin := router.Group("/admin")            // auth required for admin
	superAdmin := router.Group("/super-admin") // auth required for superAdmin

	// general
	router.GET("/", controllers.RootRouter)
	router.GET("/ping", controllers.PingHandler)
	router.GET("/favicon.ico", controllers.Favicon)

	// auth
	auth.POST("/login", controllers.Login)
	auth.POST("/register", controllers.Register)
	auth.POST("/forgot-password", controllers.ChangePasswordInitHandler)
	auth.POST("/reset-password", controllers.ChangePasswordFinalHandler)
	auth.Use(middlewares.Auth(models.UserRoleTypeValues))
	{
		auth.POST("/logout", controllers.Logout)
		auth.POST("/revalidate", controllers.Revalidate)
	}

	// trainee only
	trainee.Use(middlewares.Auth([]string{models.TRAINEE}))
	{
	}

	// trainer only
	trainer.Use(middlewares.Auth([]string{models.TRAINER}))
	{
	}

	// admin only
	admin.Use(middlewares.Auth([]string{models.ADMIN}))
	{
	}

	// superAdmin only
	superAdmin.Use(middlewares.Auth([]string{models.SUPER_ADMIN}))
	{
	}

	return router
}
