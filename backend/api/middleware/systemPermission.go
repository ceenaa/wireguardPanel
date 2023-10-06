package middleware

import (
	"api/initializers"
	"api/models"
	"github.com/gin-gonic/gin"
	"log"
)

func contains(userID uint, systemID uint) bool {
	var result uint
	err := initializers.DB.Table("user_systems").Where("user_id = ?", userID).Where("system_id = ?", systemID).Pluck("user_id", &result).Error
	if err != nil {
		log.Println(err)
	}
	if result == 0 {
		return false
	}
	return true
}

func SystemPermission(c *gin.Context) {
	var user models.User
	name := c.Param("name")
	user = c.MustGet("user").(models.User)
	if user.Role != "admin" {
		var systemID uint = 10
		initializers.DB.Model(&models.System{}).Where("name = ?", name).Pluck("id", &systemID)
		if !contains(user.ID, systemID) {
			c.AbortWithStatus(403)
		}
	}

	c.Next()
}
