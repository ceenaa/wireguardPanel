package initializers

import "api/models"

func SyncDataBase() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		panic("Error in migrating User")
	}
}