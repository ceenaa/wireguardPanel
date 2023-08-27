package controllers

import (
	"api/initializers"
	"api/models"
	"api/wireguard"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func SystemCreate(c *gin.Context) {
	var body struct {
		Name        string `binding:"required"`
		StartedDate string
	}
	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}
	initializers.DB.Create(&models.System{
		Name:        body.Name,
		StartedDate: body.StartedDate,
	})

	c.JSON(200, gin.H{"message": "System created"})
}

func SystemShow(c *gin.Context) {
	name := c.Param("name")
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid page number"})
		return
	}
	perPageNum, err := strconv.Atoi(perPage)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid per page number"})
		return
	}
	startIdx := (pageNum - 1) * perPageNum
	endIdx := startIdx + perPageNum
	if endIdx > len(wireguard.SortedPeerBasedOnExpireDate) {
		endIdx = len(wireguard.SortedPeerBasedOnExpireDate)
	}

	var system models.System
	initializers.DB.Where("name = ?", name).Preload("Peers").First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	var result models.SystemInfo
	result.Name = system.Name
	result.StartedDate = system.StartedDate
	result.TotalUsage = system.TotalUsage
	selectedPeers := wireguard.SortedPeerBasedOnExpireDate[startIdx:endIdx]
	peersInfo := make([]models.PeerInfo, len(selectedPeers))
	for i, peer := range selectedPeers {
		peersInfo[i].Name = peer.Name
		peersInfo[i].Usage = peer.Usage
		peersInfo[i].DataLimit = peer.DataLimit
		peersInfo[i].BuyDate = peer.BuyDate
		peersInfo[i].ExpireDate = peer.ExpireDate
		peersInfo[i].IsActive = peer.IsActive
	}

	result.Peers = peersInfo
	c.JSON(200, result)

}

func TestSystemShow(c *gin.Context) {
	name := c.Param("name")
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid page number"})
		return
	}
	perPageNum, err := strconv.Atoi(perPage)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid per page number"})
		return
	}
	startIdx := (pageNum - 1) * perPageNum
	endIdx := startIdx + perPageNum

	fmt.Print(endIdx)

	var system models.System
	initializers.DB.Model(&models.System{}).Preload("Peers").Where("name = ?", name).First(&system)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid system fetching"})
		return
	}
	var systemInfo models.SystemInfo
	systemInfo.Name = system.Name
	systemInfo.StartedDate = system.StartedDate
	systemInfo.TotalUsage = system.TotalUsage
	selectedPeers := system.Peers
	peersInfo := make([]models.PeerInfo, len(selectedPeers))
	for i, peer := range selectedPeers {
		peersInfo[i].Name = peer.Name
		peersInfo[i].Usage = peer.Usage
		peersInfo[i].DataLimit = peer.DataLimit
		peersInfo[i].BuyDate = peer.BuyDate
		peersInfo[i].ExpireDate = peer.ExpireDate
		peersInfo[i].IsActive = peer.IsActive
	}
	systemInfo.Peers = peersInfo

	c.JSON(200, systemInfo)

}

func SystemShowBasedOnUsage(c *gin.Context) {
	name := c.Param("name")
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid page number"})
		return
	}
	perPageNum, err := strconv.Atoi(perPage)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid per page number"})
		return
	}
	startIdx := (pageNum - 1) * perPageNum
	endIdx := startIdx + perPageNum
	if endIdx > len(wireguard.SortedPeerBasedOnUsage) {
		endIdx = len(wireguard.SortedPeerBasedOnUsage)
	}

	var system models.System
	initializers.DB.Where("name = ?", name).Preload("Peers").First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	var result models.SystemInfo
	result.Name = system.Name
	result.StartedDate = system.StartedDate
	result.TotalUsage = system.TotalUsage
	selectedPeers := wireguard.SortedPeerBasedOnUsage[startIdx:endIdx]
	peersInfo := make([]models.PeerInfo, len(selectedPeers))
	for i, peer := range selectedPeers {
		peersInfo[i].Name = peer.Name
		peersInfo[i].Usage = peer.Usage
		peersInfo[i].DataLimit = peer.DataLimit
		peersInfo[i].BuyDate = peer.BuyDate
		peersInfo[i].ExpireDate = peer.ExpireDate
		peersInfo[i].IsActive = peer.IsActive
	}

	result.Peers = peersInfo
	c.JSON(200, result)
}

func SystemCreatePeer(c *gin.Context) {
	name := c.Param("name")
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
	var system models.System
	initializers.DB.Where("name = ?", name).Preload("Peer").First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	publicKey, privateKey := wireguard.GenerateKeys()
	psk := wireguard.GeneratePSK()
	peer := models.Peer{
		Name:           body.Name,
		Phone:          body.Phone,
		Email:          body.Email,
		AllowedIP:      body.AllowedIP,
		ConfigEndPoint: body.ConfigEndPoint,
		PublicKey:      publicKey,
		PrivateKey:     privateKey,
		PreSharedKey:   psk,
		DataLimit:      body.DataLimit,
		BuyDate:        body.BuyDate,
		ExpireDate:     body.ExpireDate,
		SystemID:       system.ID,
	}
	result := initializers.DB.Create(&peer)
	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Peer not created"})
		return
	}
	c.JSON(200, gin.H{"message": "Peer created"})
}

func SystemReload(c *gin.Context) {
	name := c.Param("name")
	var system models.System
	initializers.DB.Where("name = ?", name).First(&system)
	if system.ID == 0 {
		c.JSON(404, gin.H{"error": "System not found"})
		return
	}
	err := wireguard.ReloadSystem(system.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Reloading system failed", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "System reloaded"})
}
