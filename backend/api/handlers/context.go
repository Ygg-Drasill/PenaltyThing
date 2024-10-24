package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/repository"
)

type DBContext struct {
	repo *repository.Repository
}

func NewDbContext(repo *repository.Repository) *DBContext {
	return &DBContext{
		repo: repo,
	}
}
