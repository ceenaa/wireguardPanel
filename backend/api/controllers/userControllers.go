package controllers

import (
	"api/initializers"
	"api/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"time"
)

type CreateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
type UserLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// @Summary Create a new user account
// @Description Register a new user account with a username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body CreateUserRequest true "User credentials"
// @Success 200 {string} string "User created"
// @Router /signup [post]
func SignUp(c *gin.Context) {
	// GET the email/Pas off req body
	var body CreateUserRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create the user
	user := models.User{
		Username: body.Username,
		Role:     body.Role,
		Password: string(hash),
	}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create user"})
		return
	}
	// Respond

	c.JSON(200, gin.H{"message": "User created"})
}

// @Summary User login
// @Description Log in a user with username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body UserLoginRequest true "User credentials"
// @Success 200 {string} string "User logged in"
// @Router /login [post]
func Login(c *gin.Context) {
	// Get the email and pass off req body
	var body UserLoginRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}

	// Look up requested user
	var user models.User
	initializers.DB.First(&user, "username = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Generate a go_auth token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign the token with our secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to generate token",
		})
		return
	}
	// send it back
	c.SetSameSite(http.SameSiteDefaultMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary User logout
// @Description Log out the current user.
// @Tags Authentication
// @Produce json
// @Success 200 {string} string "User logged out"
// @Router /logout [get]
func Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)
}

// @Summary Validate user session
// @Description Check if the user is logged in and the session is valid.
// @Tags Authentication
// @Produce json
// @Success 200 {string} string "User logged in" {string} string "User role"
// @Router /validate [get]
func Validate(c *gin.Context) {
	var user models.User
	user = c.MustGet("user").(models.User)

	c.JSON(http.StatusOK, gin.H{
		"message": "Im logged in",
		"role":    user.Role,
	})
}
