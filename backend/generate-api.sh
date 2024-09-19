#!/bin/bash

swag fmt
swag init -g ./main.go --parseDependency --parseInternal -o api/docs