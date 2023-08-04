package models

import "gorm.io/gorm"

type Peer struct {
	gorm.Model
	Name           string `gorm:"unique; required; not null; default:'null'"`
	Phone          string
	Email          string
	PublicKey      string `gorm:"unique; required; not null; default: null" json:"-"`
	PrivateKey     string `gorm:"unique; required; not null; default: null" json:"-"`
	PreSharedKey   string `json:"-"`
	AllowedIP      string `gorm:"unique; not null; default: null; required"`
	ConfigEndPoint string `gorm:" required; not null; default: null"`
	EndPoint       string
	LastHandshake  string
	Usage          float32
	DataLimit      float32 `gorm:"default:null"`
	BuyDate        string
	ExpireDate     string `gorm:"default:null"`
	IsActive       bool   `gorm:"default:true"`
	SystemID       uint
}

type PeerInfo struct {
	Name       string
	Usage      float32
	DataLimit  float32
	IsActive   bool
	BuyDate    string
	ExpireDate string
}
