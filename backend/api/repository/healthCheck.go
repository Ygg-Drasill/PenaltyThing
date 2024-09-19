package repository

import "fmt"

func (repo *Repository) VerifyDatabaseConnection() error {
	sqlDB, err := repo.db.DB()
	if err != nil {
		return fmt.Errorf("failed to get database connection: %w", err)
	}
	err = sqlDB.Ping()
	if err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	return nil
}

func (repo *Repository) DatabaseStats() (map[string]interface{}, error) {
	sqlDB, err := repo.db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database connection: %w", err)
	}
	stats := sqlDB.Stats()
	return map[string]interface{}{
		"max_open_connections": stats.MaxOpenConnections,
		"open_connections":     stats.OpenConnections,
		"in_use":               stats.InUse,
		"idle":                 stats.Idle,
	}, nil
}
