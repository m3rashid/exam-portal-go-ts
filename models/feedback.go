package models

type Feedback struct {
	Model
	UserId   int    `gorm:"not null"`
	TestId   int    `gorm:"not null"`
	Feedback string `gorm:"not null"`
	Rating   int    `gorm:"not null; less_than:6; greater_than:0"`
}
