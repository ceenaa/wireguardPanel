package main

import (
	"api/controllers"
	"api/initializers"
	"api/middleware"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDataBase()
}

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("logout", middleware.RequireAuth, controllers.Logout)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.POST("system", middleware.RequireAuth, controllers.SystemCreate)
	r.POST("system/:name/peer", middleware.RequireAuth, controllers.SystemCreatePeer)
	r.GET("system/:name", middleware.RequireAuth, controllers.SystemShow)
	r.GET("system/:name/sort/usage", middleware.RequireAuth, controllers.SystemShowBasedOnUsage)

	r.GET("peer/:name", middleware.RequireAuth, controllers.PeerShow)
	r.GET("peer/reset/:name", middleware.RequireAuth, controllers.PeerResetUsage)
	r.PUT("peer/:name", middleware.RequireAuth, controllers.PeerUpdate)

	r.DELETE("peer/:name", middleware.RequireAuth, controllers.PeerDelete)
	r.GET("peer/pause/:name", middleware.RequireAuth, controllers.PeerPause)
	r.GET("peer/resume/:name", middleware.RequireAuth, controllers.PeerResume)
	r.GET("system/reload/:name", middleware.RequireAuth, controllers.SystemReload)

	r.Run()
}
