package controllers

import (
	"api/initializers"
	"api/models"
	"api/wireguard"
	"github.com/gin-gonic/gin"
)

func PeerShow(c *gin.Context) {
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}

	c.JSON(200, peer)

}

func PeerUpdate(c *gin.Context) {
	var body struct {
		Name           string
		Phone          string
		Email          string
		AllowedIP      string  `json:"allowed_ip"`
		ConfigEndPoint string  `json:"config_end_point"`
		DataLimit      float32 `json:"data_limit"`
		BuyDate        string  `json:"buy_date"`
		ExpireDate     string  `json:"expire_date"`
	}
	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}
	if body.Name == "" || body.ConfigEndPoint == "" || body.AllowedIP == "" {
		c.JSON(400, gin.H{"error": "Fields cannot be empty"})
		return
	}
	peer.Name = body.Name
	peer.Phone = body.Phone
	peer.Email = body.Email
	peer.AllowedIP = body.AllowedIP
	peer.ConfigEndPoint = body.ConfigEndPoint
	peer.DataLimit = body.DataLimit
	peer.BuyDate = body.BuyDate
	peer.ExpireDate = body.ExpireDate

	initializers.DB.Save(&peer)

	c.JSON(200, gin.H{"message": "Peer updated"})
}

func PeerDelete(c *gin.Context) {
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}
	var message string
	var err error
	if peer.IsActive {
		var system models.System
		initializers.DB.Where("id = ?", peer.SystemID).First(&system)
		if system.ID == 0 {
			c.JSON(404, gin.H{"error": "System not found"})
			return
		}
		message, err = wireguard.PausePeer(system.Name, peer.PublicKey, peer.AllowedIP)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
	}
	initializers.DB.Delete(&peer)
	c.JSON(200, gin.H{"message": "Peer deleted", "wireguard": message})
}

func PeerPause(c *gin.Context) {
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}
	if peer.IsActive == false {
		c.JSON(400, gin.H{"error": "Peer already paused"})
		return
	}
	var system models.System
	initializers.DB.Where("id = ?", peer.SystemID).First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	err := wireguard.ReloadSystem(system.Name)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	message, err := wireguard.PausePeer(system.Name, peer.PublicKey, peer.AllowedIP)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	initializers.DB.Model(&peer).Update("IsActive", false)
	c.JSON(200, gin.H{"message": "Peer paused", "wireguard": message})
}

func PeerResume(c *gin.Context) {
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}
	if peer.IsActive == true {
		c.JSON(400, gin.H{"error": "Peer already active"})
		return
	}
	var system models.System
	initializers.DB.Where("id = ?", peer.SystemID).First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	err := wireguard.ReloadSystem(system.Name)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	message, err := wireguard.ResumePeer(system.Name, peer.PublicKey, peer.AllowedIP, peer.PreSharedKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	initializers.DB.Model(&peer).Update("IsActive", true)
	c.JSON(200, gin.H{"message": "Peer Resumed", "wireguard": message})

}

func PeerResetUsage(c *gin.Context) {
	name := c.Param("name")
	var peer models.Peer
	initializers.DB.Where("name = ?", name).First(&peer)
	if peer.ID == 0 {
		c.JSON(404, gin.H{"error": "Peer not found"})
		return
	}
	var system models.System
	initializers.DB.Where("id = ?", peer.SystemID).First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	message, err := wireguard.PausePeer(system.Name, peer.PublicKey, peer.AllowedIP)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error(), "wireguard": message})
		return
	}
	message, err = wireguard.ResumePeer(system.Name, peer.PublicKey, peer.AllowedIP, peer.PreSharedKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error(), "wireguard": message})
		return
	}
	c.JSON(200, gin.H{"message": "Peer usage reset", "wireguard": message})
}
