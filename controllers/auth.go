package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/exam-portal/models"
	"github.com/m3rashid/exam-portal/params"
	"github.com/m3rashid/exam-portal/utils/db"
	"github.com/m3rashid/exam-portal/utils/helpers"
	"github.com/m3rashid/exam-portal/utils/jwt"
	"golang.org/x/crypto/bcrypt"
)

func CurrentUser(c *gin.Context) *models.User {
	sub, _ := c.Get("sub")
	user, _ := models.FindUserByColum("id", sub)
	return user
}

func Login(c *gin.Context) {
	var reqBody params.LogIn
	var user *models.User

	if err := c.ShouldBind(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.FindUserByEmail(reqBody.Email)
	if err {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Internal server errror"})
		return
	}

	if !user.Active {
		c.JSON(http.StatusBadRequest, gin.H{"status": "User does not exists"}) // deleted user
		return
	}

	payload := jwt.GenPayload(user.Role, user.ID.String())
	jwt.RevokeLastJwt(payload)

	token := jwt.Encoder(payload)

	c.JSON(http.StatusOK, gin.H{
		"status": "Logged in Successfully",
		"token":  token,
		"user":   user,
	})
}

func Register(c *gin.Context) {
	var reqBody params.Register
	var user *models.User

	if err := c.ShouldBind(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.FindUserByEmail(reqBody.Email)
	if !err {
		c.JSON(http.StatusBadRequest, gin.H{"status": "A user already exists"})
		return
	}

	hash, er := bcrypt.GenerateFromPassword([]byte(reqBody.Password), bcrypt.DefaultCost)
	if er != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": er.Error()})
		return
	}

	db.DB.Model(&user).Create(&models.User{
		Email:    reqBody.Email,
		Name:     reqBody.Name,
		Contact:  reqBody.Contact,
		Location: reqBody.Location,
		Role:     reqBody.Role,
		Avatar:   reqBody.Avatar,
		Active:   true,
		Password: string(hash),
	})

	payload := jwt.GenPayload(user.Role, user.ID.String())
	jwt.RevokeLastJwt(payload)

	token := jwt.Encoder(payload)

	c.JSON(http.StatusOK, gin.H{
		"status": "User created successfully",
		"token":  token,
		"user":   user,
	})
}

func Revalidate(c *gin.Context) {
	user := CurrentUser(c)
	payload := jwt.GenPayload(user.Role, user.ID.String())
	jwt.RevokeLastJwt(payload)
	token := jwt.Encoder(payload)

	c.JSON(http.StatusOK, gin.H{
		"status": "Logged in Successfully",
		"token":  token,
		"user":   user,
	})
}

func Logout(c *gin.Context) {
	user := CurrentUser(c)
	payload := jwt.GenPayload(user.Role, user.ID.String())
	jwt.RevokeLastJwt(payload)

	c.JSON(http.StatusOK, gin.H{"status": "Logged out successfully"})
}

func ChangePasswordInitHandler(c *gin.Context) {
	var change params.ChangePasswordInit
	var user *models.User

	if err := c.ShouldBind(&change); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.FindUserByEmail(change.Email)
	if err {
		c.JSON(http.StatusBadRequest, gin.H{"status": "User not found"})
		return
	}

	if !user.Active {
		c.JSON(http.StatusBadRequest, gin.H{"status": "User does not exists"}) // deleted user
		return
	}

	otp, _ := helpers.GenerateRandomNumber(999999, 100000)
	// TODO: send otp to user email

	// update the user with otp
	db.DB.Model(&user).Updates(models.User{
		LastOtp: strconv.Itoa(otp),
	})
	c.JSON(http.StatusOK, gin.H{"status": "otp sent to email"})
}

func ChangePasswordFinalHandler(c *gin.Context) {
	var change params.ChangePasswordFinal
	var oldEncryptedPassword string
	var user *models.User

	if err := c.ShouldBind(&change); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if change.Password != change.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"status": "password and password confirm not match"})
		return
	}

	user, _ = models.FindUserByEmail(change.Email)
	oldEncryptedPassword = user.Password

	if user.LastOtp != change.Otp {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Otp did not match, try again after some time"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(oldEncryptedPassword), []byte(change.OriginalPassword))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "origin password error"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(change.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	encryptedPassword := string(hash)
	var payload jwt.Payload
	db.DB.Model(&user).Updates(models.User{Password: encryptedPassword})

	payload = jwt.GenPayload(user.Role, user.ID.String())
	jwt.RevokeLastJwt(payload)

	c.JSON(http.StatusOK, gin.H{"status": "update password success"})
}
