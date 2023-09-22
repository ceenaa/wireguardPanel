package wireguard

import (
	"api/initializers"
	"api/models"
	"os/exec"
	"time"
)

func pause(peer models.Peer) (string, error) {
	peer.IsActive = false
	peer.LastUsage = peer.Usage
	initializers.DB.Save(&peer)
	var system models.System
	initializers.DB.Where("id = ?", peer.SystemID).First(&system)

	cmd := exec.Command("wg", "set", system.Name, "peer", peer.PublicKey, "remove")
	output, err := cmd.Output()
	if err != nil {
		return "Failed to pause peer", err
	}
	cmd = exec.Command("ip", "-4", "route", "delete", peer.AllowedIP, "dev", system.Name)
	output, err = cmd.Output()
	if err != nil {
		return "Failed to delete route", err
	}
	return string(output), nil
}

func PauseExpiredTime() (string, error) {
	tehran, _ := time.LoadLocation("Asia/Tehran")
	tehranDate := time.Now().In(tehran).Format("2006-01-02")
	var ExpiredPeers []models.Peer
	initializers.DB.Where("expire_date <= ?", tehranDate).Find(&ExpiredPeers)

	for _, peer := range ExpiredPeers {
		output, err := pause(peer)
		if err != nil {
			return output, err
		}
	}
	return "Expired peers paused", nil
}

func PauseExpiredUsage() (string, error) {
	var ExpiredPeers []models.Peer
	initializers.DB.Where("usage >= max_usage").Find(&ExpiredPeers)

	for _, peer := range ExpiredPeers {
		output, err := pause(peer)
		if err != nil {
			return output, err
		}
	}
	return "Expired peers paused", nil
}

func AutoReloadAndPause() (string, error) {
	for {

		var systems []models.System
		initializers.DB.Find(&systems)
		for _, system := range systems {
			err := ReloadSystem(system.Name)
			if err != nil {
				return "", err
			}
		}

		expiredTime, err := PauseExpiredTime()
		if err != nil {
			return expiredTime, err
		}
		usage, err := PauseExpiredUsage()
		if err != nil {
			return usage, err
		}
		time.Sleep(30 * time.Minute)
	}
}
