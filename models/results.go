package models

type Result struct {
	TestId        int `gorm:"not null"`
	UserId        int `gorm:"not null"`
	AnswerSheetId int `gorm:"not null"`
	Score         int `gorm:"not null"`
}
