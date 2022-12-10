package helpers

type InputType interface {
	~string | ~int | ~int64 | ~float64 | ~float32
}

func Contains[T InputType](arr []T, val T) bool {
	for _, v := range arr {
		if v == val {
			return true
		}
	}

	return false
}
