package handlers

import (
	"github.com/Ygg-Drasill/PenaltyThing/backend/api/repository"
)

type DbContext struct {
	repo *repository.Repository
}

func NewDbContext(repo *repository.Repository) *DbContext {
	return &DbContext{
		repo: repo,
	}
}
