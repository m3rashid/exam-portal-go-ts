package models

type TestPaper struct {
	Model
	Title                 string `gorm:"not null"`
	Questions             []int  `gorm:"type:integer[]"` // array of question ids
	Subjects              []int  `gorm:"type:integer[]"` // array of subject ids
	Duration              int    `gorm:"not null"`
	TestBegins            bool   `gorm:"default:false"`
	CreatedBy             int    `gorm:"not null"`
	IsRegistrationAllowed bool   `gorm:"default:true"`
	TestCompleted         bool   `gorm:"default:false"`
}
