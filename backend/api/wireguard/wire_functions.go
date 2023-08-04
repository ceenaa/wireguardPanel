package wireguard

import (
	"api/initializers"
	"api/models"
	"bytes"
	"fmt"
	"log"
	"os/exec"
	"sort"
	"strconv"
	"strings"
	"time"
)

func convertByteToGB(data int) float32 {
	Gib := float32(data) / 1024 / 1024 / 1024
	res, err := strconv.ParseFloat(fmt.Sprintf("%.2f", Gib), 32)
	if err != nil {
		log.Fatal(err)
	}
	return float32(res)
}

func GenerateKeys() (publicKey string, privateKey string) {
	// Create the "wg genkey" command
	genKeyCmd := exec.Command("wg", "genkey")

	// Run "wg genkey" and capture the output
	privateKeyBytes, err := genKeyCmd.Output()
	if err != nil {
		fmt.Printf("Error running 'wg genkey': %s\n", err)
		return
	}

	privateKey = string(privateKeyBytes)

	// Create the "wg pubkey" command
	pubKeyCmd := exec.Command("wg", "pubkey")

	// Pipe the privateKeyBytes as the input to "wg pubkey" command
	pubKeyCmd.Stdin = bytes.NewReader(privateKeyBytes)

	// Run "wg pubkey" and capture the output
	publicKeyBytes, err := pubKeyCmd.Output()
	if err != nil {
		fmt.Printf("Error running 'wg pubkey': %s\n", err)
		return
	}

	publicKey = string(publicKeyBytes)

	// Now you have the privateKey and publicKey, you can use them in your Go program as needed
	return publicKey, privateKey
}

func GeneratePSK() string {
	cmd := exec.Command("wg", "genpsk")
	output, err := cmd.Output()
	if err != nil {
		fmt.Println("Error generating PSK:", err)
		return ""
	}
	return string(output)
}

func PausePeer(systemName string, publicKey string, allowedIp string) (string, error) {
	cmd := exec.Command("wg", "set", systemName, "peer", publicKey, "remove")
	output, err := cmd.Output()
	if err != nil {
		return "Failed to pause peer", err
	}
	cmd = exec.Command("ip", "-4", "route", "delete", allowedIp, "dev", systemName)
	output, err = cmd.Output()
	if err != nil {
		return "Failed to delete route", err
	}
	return string(output), nil
}

func ResumePeer(systemName string, publicKey string, allowedIp string, psk string) (string, error) {
	cmd := exec.Command("wg", "set", systemName, "peer", publicKey,
		"allowed-ips", allowedIp, "preshared-key", "<(echo", psk+")")
	output, err := cmd.Output()
	if err != nil {
		return "Failed to resume peer", err
	}
	cmd = exec.Command("ip", "-4", "route", "add", allowedIp, "dev", systemName)
	output, err = cmd.Output()
	if err != nil {
		return "Failed to add route", err
	}
	return string(output), nil
}

var SortedPeerBasedOnUsage []models.Peer
var SortedPeerBasedOnExpireDate []models.Peer

func ReloadSystem(sysName string) error {
	cmd := exec.Command("wg", "show", sysName, "dump")
	output, err := cmd.Output()
	var totalTransfer = 0
	if err != nil {
		return err
	}
	stringOutput := string(output)
	lines := strings.Split(stringOutput, "\n")
	for _, line := range lines {
		data := strings.Split(line, "\t")
		publicKey := data[0]
		// preSharedKey := data[1]
		endPoint := data[2]
		// allowedIp := data[3]
		timeStamp, err := strconv.Atoi(data[4])
		dt := time.Unix(int64(timeStamp), 0)
		tehranTimeZone, err := time.LoadLocation("Asia/Tehran")
		if err != nil {
			return err
		}
		dt = dt.In(tehranTimeZone)
		latestHandshake := dt.Format("2006-01-02 15:04:05")
		holder1, err := strconv.Atoi(data[5])
		if err != nil {
			return err
		}
		holder2, err := strconv.Atoi(data[6])
		if err != nil {
			return err
		}
		totalTransfer += holder1 + holder2
		transfer := convertByteToGB(holder2 + holder1)

		var peer models.Peer
		initializers.DB.Where("public_key = ?", publicKey).First(&peer)
		peer.IsActive = true
		peer.Usage = transfer
		peer.LastHandshake = latestHandshake
		peer.EndPoint = endPoint
		peer.EndPoint = endPoint
		peer.LastHandshake = latestHandshake
	}
	initializers.DB.Model(&models.System{}).Where("name = ?", sysName).Update("total_usage", totalTransfer)

	var system models.System
	initializers.DB.Where("name = ?", sysName).Preload("Peer").First(&system)
	SortedPeerBasedOnUsage = system.Peers
	SortedPeerBasedOnExpireDate = system.Peers

	sort.Slice(SortedPeerBasedOnUsage, func(i, j int) bool {
		return SortedPeerBasedOnUsage[i].Usage < SortedPeerBasedOnUsage[j].Usage
	})
	sort.Slice(SortedPeerBasedOnExpireDate, func(i, j int) bool {
		expireDateI, _ := time.Parse("2006-01-02", SortedPeerBasedOnExpireDate[i].ExpireDate)
		expireDateJ, _ := time.Parse("2006-01-02", SortedPeerBasedOnExpireDate[j].ExpireDate)
		return expireDateI.Before(expireDateJ)
	})
	return nil

}
