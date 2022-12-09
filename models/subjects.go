package models

type Subject struct {
	Model
	Name   string `gorm:"not null"`
	Active bool   `gorm:"default:true"`
}
