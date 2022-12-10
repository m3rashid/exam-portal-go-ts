package helpers

import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func GenerateRandomNumber(nums ...int) (int, error) {
	if len(nums) != 2 {
		return 0, errors.New("invalid number of arguments")
	}

	max := nums[0]
	min := nums[1]

	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(max-min) + min
	fmt.Println(num)
	return num, nil
}
