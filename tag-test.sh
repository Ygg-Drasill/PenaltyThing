#!/bin/bash

git pull

git add .

git commit -m "Testing GH Actions with Dockerfile"

git push

git push --delete origin v0.0.2

git tag --delete v0.0.2

git tag -a v0.0.2 -m "Version 0.0.2"

git push origin v0.0.2
