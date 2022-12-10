package jwt

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/m3rashid/exam-portal/utils/config"
	"github.com/m3rashid/exam-portal/utils/redis"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/spf13/viper"
)

type Payload struct {
	Scope string `json:"scope,omitempty"`
	jwt.StandardClaims
}

func GenPayload(scope, sub string) Payload {
	now := time.Now()
	return Payload{
		Scope: scope,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: now.Add(1 * time.Hour).Unix(),
			Id:        uuid.New().String(),
			NotBefore: now.Unix(),
			IssuedAt:  now.Unix(),
			Subject:   sub,
		},
	}
}

func JwtRevoked(payload Payload) bool {
	return redis.Exists(fmt.Sprintf("user_blacklist:%s:%s", payload.Subject, payload.Id))
}

func RevokeJwt(payload Payload) {
	expiration := payload.ExpiresAt - payload.IssuedAt
	redis.SetEx(fmt.Sprintf("user_blacklist:%s:%s", payload.Subject, payload.Id), payload.Id, time.Duration(expiration)*time.Second)
}

func RevokeLastJwt(payload Payload) {
	lastJwt := redis.Get(fmt.Sprintf("user_jwt:%s", payload.Subject))
	if lastJwt != "" {
		arr := strings.Split(lastJwt, ":")
		jti, expStr := arr[0], arr[len(arr)-1]
		exp, err := strconv.ParseInt(expStr, 10, 64)
		if err != nil {
			exp = time.Now().Unix()
		}

		payload.Id = jti
		payload.IssuedAt = time.Now().Unix()
		payload.ExpiresAt = exp
		RevokeJwt(payload)
	}
}

func OnJwtDispatch(payload Payload) {
	RevokeLastJwt(payload)
	redis.SetEx(fmt.Sprintf("user_jwt:%s", payload.Subject), fmt.Sprintf("%s:%d", payload.Id, payload.ExpiresAt), time.Until(time.Unix(payload.ExpiresAt, 0)))
}

func Encoder(payload Payload) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenString, err := token.SignedString([]byte(config.GetEnv("JWT_SECRET_KEY")))
	if err != nil {
		fmt.Println(err)
	}
	return tokenString
}

func Decoder(tokenString string) (string, string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Payload{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(viper.Get("JWT_SECRET_KEY").(string)), nil
	})

	if err != nil {
		return "", "", err
	}

	if payload, ok := token.Claims.(*Payload); ok && token.Valid {
		sub := (*payload).Subject
		scope := (*payload).Scope
		if sub != "" && !JwtRevoked(*payload) && scope != "" {
			return sub, scope, nil
		}
	}

	return "", "", fmt.Errorf("invalid token")
}
