package middleware

import (
	"api/models"
	"github.com/gin-gonic/gin"
)

func AdminPermission(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	if user.Role != "admin" {
		c.AbortWithStatusJSON(403, gin.H{"error": "You don't have permission to do this."})
		return
	}
	c.Next()
}
