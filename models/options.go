package models

type Option struct {
	Model
	OptionImage string
	OptionText  string `gorm:"not null"`
	IsAnswer    bool   `gorm:"default:false"`
}
