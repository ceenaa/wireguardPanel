package controllers

import (
	"api/initializers"
	"api/models"
	"api/wireguard"
	"fmt"
	"github.com/gin-gonic/gin"
)

// PeerShow godoc
// @Summary Get information about a peer
// @Description Retrieve information about a peer by name.
// @Tags Peers
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} models.Peer "Peer information"
// @Failure 404 {object} gin.H "Peer not found"
// @Router /peers/{name} [get]
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

type peerUpdateBody struct {
	Name           string
	Phone          string
	Email          string
	AllowedIP      string  `json:"allowed_ip"`
	ConfigEndPoint string  `json:"config_end_point"`
	DataLimit      float32 `json:"data_limit"`
	BuyDate        string  `json:"buy_date"`
	ExpireDate     string  `json:"expire_date"`
}

// PeerUpdate godoc
// @Summary Update a peer's information
// @Description Update a peer's information by name.
// @Tags Peers
// @Accept json
// @Produce json
// @Param name path string true "Peer name"
// @Param body body peerUpdateBody true "Updated peer information"
// @Success 200 {object} gin.H "Peer updated"
// @Failure 400 {object} gin.H "Fields cannot be empty"
// @Router /peers/{name} [put]
func PeerUpdate(c *gin.Context) {
	var body peerUpdateBody
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

// PeerDelete godoc
// @Summary Delete a peer
// @Description Delete a peer by name.
// @Tags Peers
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} gin.H "Peer deleted"
// @Failure 404 {object} gin.H "Peer not found"
// @Router /peers/{name} [delete]
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
	initializers.DB.Unscoped().Delete(&peer)
	c.JSON(200, gin.H{"message": "Peer deleted", "wireguard": message})
}

// PeerPause godoc
// @Summary Pause a peer
// @Description Pause a peer by name.
// @Tags Peers
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} gin.H "Peer paused"
// @Failure 400 {object} gin.H "Peer already paused" "Peer not found" "System not found"
// @Router /peers/{name}/pause [put]
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
	c.JSON(200, gin.H{"message": "Peer paused", "wireguard": message})
}

// PeerResume godoc
// @Summary Resume a peer
// @Description Resume a peer by name.
// @Tags Peers
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} gin.H "Peer resumed"
// @Failure 400 {object} gin.H "Peer already active" "Peer not found" "System not found"
// @Router /peers/{name}/resume [put]
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
	c.JSON(200, gin.H{"message": "Peer Resumed", "wireguard": message})

}

// PeerResetUsage godoc
// @Summary Reset a peer's usage
// @Description Reset a peer's usage by name.
// @Param name path string true "Peer name"
// @Tags Peers
// @Produce json
// @Success 200 {object} gin.H "Peer usage reset"
// @Failure 400 {object} gin.H "Peer not found" "System not found"
// @Router /peers/{name}/reset [put]
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
	initializers.DB.Where("name = ?", name).First(&peer)
	peer.LastUsage = 0
	peer.Usage = 0
	initializers.DB.Save(&peer)

	c.JSON(200, gin.H{"message": "Peer usage reset", "wireguard": message})
}

func PeerShowConfig(c *gin.Context) {
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
	file := fmt.Sprintf("../../configs/%s/%s.conf", system.Name, name)
	c.Header("Content-Type", "txt/plain")

	c.File(file)
}

func PeerShowQR(c *gin.Context) {
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
	file := fmt.Sprintf("../../configs/%s/%s.png", system.Name, name)
	c.Header("Content-Type", "image/png")
	c.File(file)
}

// TestPeerPause godoc
// @Summary Pause a peer
// @Description Pause a peer by name.
// @Tags Peers
// @Tags Test
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} gin.H "Peer paused"
// @Failure 400 {object} gin.H "Peer already paused" "Peer not found" "System not found"
// @Router /test/peers/{name}/pause [put]
func TestPeerPause(c *gin.Context) {
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
	message := "test"
	initializers.DB.Model(&peer).Update("IsActive", false)
	c.JSON(200, gin.H{"message": "Peer paused", "wireguard": message})
}

// TestPeerResume godoc
// @Summary Resume a peer
// @Description Resume a peer by name.
// @Tags Peers
// @Tags Test
// @Param name path string true "Peer name"
// @Produce json
// @Success 200 {object} gin.H "Peer resumed"
// @Failure 400 {object} gin.H "Peer already active" "Peer not found" "System not found"
// @Router /test/peers/{name}/resume [put]
func TestPeerResume(c *gin.Context) {
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
	message := "test"
	initializers.DB.Model(&peer).Update("IsActive", true)
	c.JSON(200, gin.H{"message": "Peer Resumed", "wireguard": message})

}

// TestPeerResetUsage godoc
// @Summary Reset a peer's usage
// @Description Reset a peer's usage by name.
// @Param name path string true "Peer name"
// @Tags Peers
// @Tags Test
// @Produce json
// @Success 200 {object} gin.H "Peer usage reset"
// @Failure 400 {object} gin.H "Peer not found" "System not found"
// @Router /test/peers/{name}/reset [put]
func TestPeerResetUsage(c *gin.Context) {
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
	initializers.DB.Where("name = ?", name).First(&peer)
	peer.Usage = 0
	initializers.DB.Save(&peer)
	message := "test"
	c.JSON(200, gin.H{"message": "Peer usage reset", "wireguard": message})
}
