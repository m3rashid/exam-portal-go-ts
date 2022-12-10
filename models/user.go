package models

import (
	"errors"
	"fmt"

	"github.com/m3rashid/exam-portal/utils/db"

	"gorm.io/gorm"
)

const (
	TRAINEE     = "TRAINEE"
	TRAINER     = "TRAINER"
	ADMIN       = "ADMIN"
	SUPER_ADMIN = "SUPER_ADMIN"
)

var UserRoleTypeValues = []string{TRAINEE, TRAINER, ADMIN, SUPER_ADMIN}

type User struct {
	Model
	Email    string `gorm:"uniqueIndex; not null"`
	Password string `gorm:"not null"`
	Name     string
	Role     string `gorm:"default:'TRAINEE'"` // TRAINEE, TRAINER, ADMIN, SUPER_ADMIN
	Contact  string
	Avatar   string
	Location string
	Tests    []int `gorm:"type:integer[]"` // array of test ids
	LastOtp  string
	Active   bool `gorm:"default:true"`
}

func FindUserByColum(colum string, value interface{}) (*User, bool) {
	var user User
	qs := fmt.Sprintf("%s = ?", colum)
	err := db.DB.Where(qs, value).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}

func FindUserByEmail(email string) (*User, bool) {
	var user User
	err := db.DB.Where("email = ?", email).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}

func FindUserByID(id string) (*User, bool) {
	var user User
	err := db.DB.Where("id = ?", id).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}
