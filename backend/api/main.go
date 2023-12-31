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

	r.Run()
}
