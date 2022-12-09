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

type User struct {
	Model
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
	Name     string
	Role     string `gorm:"default:'TRAINEE'"` // TRAINEE, TRAINER, ADMIN, SUPER_ADMIN
	Contact  string
	Avatar   string
	Location string
	Tests    []int `gorm:"type:integer[]"` // array of test ids
}

func FindUserByEmail(email string) (*User, SearchResult) {
	var user User
	result := Result(db.DB.Where("email = ?", email).First(&user).Error)
	return &user, result

}

func FindUserByID(id string) (*User, SearchResult) {
	var user User
	result := Result(db.DB.Where("id = ?", id).First(&user).Error)
	return &user, result
}

func FindUserByColum(colum string, value interface{}) (*User, bool) {
	var user User
	qs := fmt.Sprintf("%s = ?", colum)
	err := db.DB.Where(qs, value).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}
