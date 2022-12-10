package params

type Register struct {
	Email           string `form:"email" json:"email" xml:"email" binding:"required"`
	Password        string `form:"password" json:"password" xml:"password" binding:"required"`
	ConfirmPassword string `form:"confirmPassword" json:"confirmPassword" xml:"confirmPassword" binding:"required"`
	Name            string `form:"name" json:"name" xml:"name" binding:"required"`
	Contact         string `form:"contact" json:"contact" xml:"contact"`
	Avatar          string `form:"avatar" json:"avatar" xml:"avatar"`
	Location        string `form:"location" json:"location" xml:"location"`
	Role            string `form:"role" json:"role" xml:"role"`
}

type LogIn struct {
	Email    string `form:"email" json:"email" xml:"email" binding:"required"`
	Password string `form:"password" json:"password" xml:"password" binding:"required"`
}

type ChangePasswordInit struct {
	Email string `form:"userId" json:"userId" xml:"userId" binding:"required"`
}

type ChangePasswordFinal struct {
	Email            string `form:"userId" json:"userId" xml:"userId" binding:"required"`
	OriginalPassword string `form:"originalPassword" json:"originalPassword" xml:"originalPassword" binding:"required"`
	Password         string `form:"password" json:"password" xml:"password" binding:"required"`
	ConfirmPassword  string `form:"confirmPassword" json:"confirmPassword" xml:"confirmPassword" binding:"required"`
	Otp              string `form:"otp" json:"otp" xml:"otp" binding:"required"`
}
