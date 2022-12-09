package models

type Answer struct {
	Model
	QuestionID   int   `gorm:"not null"`
	ChosenOption []int `gorm:"type:integer[]"` // array of option ids
	UserId       int   `gorm:"not null"`
}
