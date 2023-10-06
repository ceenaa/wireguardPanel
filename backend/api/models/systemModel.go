package models

import "gorm.io/gorm"

type System struct {
	gorm.Model
	Name        string `gorm:"unique; required"`
	StartedDate string
	TotalUsage  float32 `gorm:"default:0"`
	PublicKey   string  `gorm:"unique; required" json:"-"`
	Peers       []Peer
}

type SystemInfo struct {
	ID               uint `json:"-"`
	Name             string
	StartedDate      string
	TotalUsage       float32
	Peers            []PeerInfo `gorm:"foreignKey:SystemID"`
	AllPeersCount    int64      `gorm:"-"`
	ActivePeersCount int64      `gorm:"-"`
}
