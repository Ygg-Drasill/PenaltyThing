# STAGE 1: Build
FROM golang:1.22.1-alpine3.19 AS go-build

WORKDIR /build

COPY ./backend/go.mod ./backend/go.sum /build/

RUN go mod download

RUN go install github.com/swaggo/swag/cmd/swag@latest

COPY ./backend .

RUN sh generate-api.sh

RUN go build -o main.exe  .

# STAGE 2: Deploy
FROM alpine:3.19.1

WORKDIR /deploy

COPY --from=go-build /build/main.exe /deploy

EXPOSE 9000

CMD ["./main.exe"]
