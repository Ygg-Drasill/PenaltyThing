package repository

import (
	"database/sql"
	"fmt"
)

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

func (repo *Repository) DatabaseStats() (*sql.DBStats, error) {
	sqlDB, err := repo.db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database connection: %w", err)
	}
	stats := sqlDB.Stats()
	return &stats, nil
}
