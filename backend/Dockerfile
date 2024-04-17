# STAGE 1: Build
FROM golang:1.22.1-alpine3.19 as go-build

WORKDIR /build

COPY ./backend/go.mod ./backend/go.sum /build/

RUN go mod download

COPY ./backend .

EXPOSE 9000

RUN --mount=type=secret,id=db_hostname
RUN --mount=type=secret,id=db_port
RUN --mount=type=secret,id=db_user
RUN --mount=type=secret,id=db_password
RUN --mount=type=secret,id=db_name
RUN --mount=type=secret,id=listen_port

ENV DB_HOSTNAME=db_hostname
ENV DB_PORT=db_port
ENV DB_USER=db_user
ENV DB_PASSWORD=db_password
ENV DB_NAME=db_name
ENV LISTEN_PORT=listen_port


RUN go build -o main.exe .

# STAGE 2: Deploy
FROM alpine:3.19.1

WORKDIR /deploy

COPY --from=go-build /build/main.exe /deploy

EXPOSE 9000

CMD ["./main.exe"]
