package initializers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type LoginResponse struct {
	AccessToken       string `json:"accessToken"`
	ExpiresIn         int    `json:"expiresIn"`
	AccessTokenMaxTTL int    `json:"accessTokenMaxTTL"`
	TokenType         string `json:"tokenType"`
}

func GetToken() (*LoginResponse, error) {
	url := "https://app.infisical.com/api/v1/auth/universal-auth/login"

	payloadFMT := fmt.Sprintf("{\n  \"clientId\": \"%s\",\n  \"clientSecret\": \"%s\"\n}",
		os.Getenv("INFISICAL_CLIENT_ID"),
		os.Getenv("INFISICAL_CLIENT_SECRET"))
	payload := strings.NewReader(payloadFMT)

	req, err := http.NewRequest("POST", url, payload)
	if err != nil {
		return nil, fmt.Errorf("error while creating login request for auth token: %w", err)
	}

	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error while sending login request for auth token: %w", err)
	}

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error while getting auth token: %s", res.Status)
	}

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error while closing the response body")
		}
	}(res.Body)

	loginResponse := &LoginResponse{}
	s, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("error while reading login response for auth token: %w", err)
	}
	err = json.Unmarshal(s, loginResponse)
	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling login response for auth token: %w", err)
	}
	return loginResponse, nil
}

type Secrets struct {
	Secrets []Secret `json:"secrets"`
}

type Secret struct {
	SecretKey   string `json:"secretKey"`
	SecretValue string `json:"secretValue"`
}

func LoadSecrets() error {
	login, err := GetToken()
	if err != nil {
		return fmt.Errorf("error while getting token: %w", err)
	}

	url := fmt.Sprintf("https://app.infisical.com/api/v3/secrets/raw/?workspaceId=%s&environment=%s",
		os.Getenv("INFISICAL_WORKSPACE"),
		os.Getenv("INFISICAL_ENVIRONMENT"))

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return fmt.Errorf("error while creating request for secrets: %w", err)
	}

	token := fmt.Sprintf("%s %s", login.TokenType, login.AccessToken)
	req.Header.Add("Authorization", token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("error while sending request for secrets: %w", err)
	}

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("error while getting secrets: %s", res.Status)
	}

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error while closing the response body")
		}
	}(res.Body)
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return fmt.Errorf("error while reading response for secrets: %w", err)
	}

	secrets := &Secrets{}
	err = json.Unmarshal(body, secrets)
	if err != nil {
		return fmt.Errorf("error while unmarshalling response for secrets: %w", err)
	}
	for _, secret := range secrets.Secrets {
		err = os.Setenv(secret.SecretKey, secret.SecretValue)
		if err != nil {
			return fmt.Errorf("error while setting environment variable for %s: %w", secret.SecretKey, err)
		}
	}
	return nil
}
