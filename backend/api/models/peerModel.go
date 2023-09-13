package models

import "gorm.io/gorm"

type Peer struct {
	gorm.Model     `json:"-"`
	Name           string  `gorm:"unique; required; not null; default:'null'" json:"name"`
	Phone          string  `json:"phone"`
	Email          string  `json:"email"`
	PublicKey      string  `gorm:"unique; required; not null; default: null" json:"-"`
	PrivateKey     string  `gorm:"unique; required; not null; default: null" json:"-"`
	PreSharedKey   string  `json:"-"`
	AllowedIP      string  `gorm:"unique; not null; default: null; required" json:"allowed_ip"`
	ConfigEndPoint string  `gorm:" required; not null; default: null" json:"config_end_point"`
	EndPoint       string  `json:"end_point"`
	LastHandshake  string  `json:"last_handshake"`
	Usage          float32 `json:"usage"`
	LastUsage      float32 `gorm:"default:0" json:"-"`
	DataLimit      float32 `gorm:"default:null" json:"data_limit"`
	BuyDate        string  `json:"buy_date"`
	ExpireDate     string  `gorm:"default:null" json:"expire_date"`
	IsActive       bool    `gorm:"default:true" json:"is_active"`
	SystemID       uint    `json:"-"`
}

type PeerInfo struct {
	ID         uint `json:"-"`
	Name       string
	Phone      string
	Usage      float32
	DataLimit  float32
	BuyDate    string
	ExpireDate string
	IsActive   bool
	SystemID   uint `json:"-"`
}
