package main

import (
	"api/controllers"
	_ "api/docs"
	"api/initializers"
	"api/middleware"
	"github.com/gin-gonic/gin"
	"github.com/swaggo/files"
	"github.com/swaggo/gin-swagger"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDataBase()
}

// @title Wireguard API
// @version 1.0
// @description This is a Wireguard API server.
// @host localhost:8000
// @BasePath /

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	// swagger
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/logout", middleware.RequireAuth, controllers.Logout)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.POST("systems", middleware.RequireAuth, controllers.SystemCreate)
	r.POST("systems/:name/peers", middleware.RequireAuth, controllers.SystemCreatePeer)
	r.GET("systems/:name", middleware.RequireAuth, controllers.SystemShow)
	r.GET("systems/:name/", middleware.RequireAuth, controllers.SystemShow)
	r.GET("systems/:name/sort/usage", middleware.RequireAuth, controllers.SystemShowBasedOnUsage)

	r.GET("peers/:name", middleware.RequireAuth, controllers.PeerShow)
	r.POST("peers/:name/reset", middleware.RequireAuth, controllers.PeerResetUsage)
	r.PUT("peers/:name", middleware.RequireAuth, controllers.PeerUpdate)

	r.DELETE("peers/:name", middleware.RequireAuth, controllers.PeerDelete)
	r.PUT("peers/:name/pause", middleware.RequireAuth, controllers.PeerPause)
	r.PUT("peers/:name/resume", middleware.RequireAuth, controllers.PeerResume)
	r.POST("systems/:name/reload", middleware.RequireAuth, controllers.SystemReload)

	r.POST("/test/systems/:name/reload", middleware.RequireAuth, controllers.TestSystemReload)
	r.POST("/test/systems/:name/peers", middleware.RequireAuth, controllers.TestSystemCreatePeer)
	r.PUT("/test/peers/:name/pause", middleware.RequireAuth, controllers.TestPeerPause)
	r.PUT("/test/peers/:name/resume", middleware.RequireAuth, controllers.TestPeerResume)
	r.POST("/test/peers/:name/reset", middleware.RequireAuth, controllers.TestPeerResetUsage)

	r.Run()
}
