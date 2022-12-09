package models

type Question struct {
	Model
	Question    string `gorm:"not null"`
	Subject     int    `gorm:"not null"`
	Options     []int  `gorm:"type:integer[]"` // array of option ids
	Answer      int    `gorm:"not null"`       // answer id
	Weightage   int    `gorm:"not null"`
	AnswerCount int    `gorm:"default:1"`
	Explanation string
	Image       string
	Active      bool `gorm:"default:true"`
	CreatedBy   int  `gorm:"not null"` // user id
}
