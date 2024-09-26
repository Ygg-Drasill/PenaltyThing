#!/bin/bash

swag fmt
swag init -g ./main.go --parseDependency --parseInternal  --parseDepth 0 -o api/docs