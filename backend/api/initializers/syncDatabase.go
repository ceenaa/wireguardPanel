package initializers

import "api/models"

func SyncDataBase() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		panic("Error in migrating User")
	}
	err = DB.AutoMigrate(&models.Customer{})
	if err != nil {
		panic("Error in migrating Customer")
	}
	err = DB.AutoMigrate(&models.Peer{})
	if err != nil {
		panic("Error in migrating Peer")
	}
	err = DB.AutoMigrate(&models.System{})
	if err != nil {
		panic("Error in migrating System")
	}
}
