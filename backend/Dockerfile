# STAGE 1: Build
FROM golang:1.22.1-alpine3.19 as go-build

WORKDIR /build

COPY ./backend/go.mod ./backend/go.sum /build/

RUN go mod download

COPY ./backend .

EXPOSE 9000

RUN --mount=type=secret,id=db_hostname \
    echo DB_HOSTNAME=$(cat /run/secrets/db_hostname) >> env.list
RUN --mount=type=secret,id=db_port \
    echo DB_PORT=$(cat /run/secrets/db_port) >> env.list
RUN --mount=type=secret,id=db_user \
    echo DB_USER=$(cat /run/secrets/db_user) >> env.list
RUN --mount=type=secret,id=db_password \
    echo DB_PASSWORD=$(cat /run/secrets/db_password) >> env.list
RUN --mount=type=secret,id=db_name \
    echo DB_NAME=$(cat /run/secrets/db_name) >> env.list
RUN --mount=type=secret,id=listen_port \
    echo LISTEN_PORT=$(cat /run/secrets/listen_port) >> env.list

RUN set -a && . ./env.list && set +a


RUN go build -o main.exe .

# STAGE 2: Deploy
FROM alpine:3.19.1

WORKDIR /deploy

COPY --from=go-build /build/main.exe /deploy

EXPOSE 9000

CMD ["./main.exe"]
