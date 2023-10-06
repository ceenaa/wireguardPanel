package middleware

import (
	"api/initializers"
	"api/models"
	"github.com/gin-gonic/gin"
)

func PeerPermission(c *gin.Context) {
	var user models.User
	name := c.Param("name")
	user = c.MustGet("user").(models.User)
	if user.Role != "admin" {
		var peer models.Peer
		initializers.DB.Model(models.Peer{}).Where("name = ? AND user_id = ?", name, user.ID).First(&peer)
		if peer.ID == 0 {
			c.AbortWithStatusJSON(403, gin.H{"error": "You don't have permission to access this peer"})
			return
		}
	}

	c.Next()
}
