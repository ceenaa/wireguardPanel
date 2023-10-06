package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Role     string
	Systems  []System `gorm:"many2many:user_systems;"`
	Peers    []Peer
}
