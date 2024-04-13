# STAGE 1: Build
FROM golang:1.22.1-alpine3.19 as go-build

WORKDIR /build

COPY ./backend/go.mod ./backend/go.sum /build/

RUN go mod download

COPY ./backend .

EXPOSE 9000

RUN go build -o main.exe .

# STAGE 2: Deploy
FROM alpine:3.19.1

WORKDIR /deploy

COPY --from=go-build /build/main.exe /deploy

EXPOSE 9000

CMD ["./main.exe"]
