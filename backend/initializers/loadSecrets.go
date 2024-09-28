package initializers

import (
	"fmt"
	"github.com/infisical/go-sdk"
	"os"
)

func LoadSecrets() error {
	client := infisical.NewInfisicalClient(infisical.Config{})

	_, err := client.Auth().UniversalAuthLogin(os.Getenv("INFISICAL_CLIENT_ID"), os.Getenv("INFISICAL_CLIENT_SECRET"))

	if err != nil {
		return fmt.Errorf("error authenticating to Infisical: %w", err)
	}

	apiSecrets, err := client.Secrets().List(infisical.ListSecretsOptions{
		ProjectID:   os.Getenv("INFISICAL_WORKSPACE"),
		Environment: os.Getenv("INFISICAL_ENVIRONMENT"),
		SecretPath:  "/",
	})

	if err != nil {
		return fmt.Errorf("error while fetching secrets: %w", err)
	}

	for _, secret := range apiSecrets {
		err = os.Setenv(secret.SecretKey, secret.SecretValue)
		if err != nil {
			return fmt.Errorf("error while setting environment variable for %s: %w", secret.SecretKey, err)
		}
	}
	return nil
}
