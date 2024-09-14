# STAGE 1: Build swagger docs
FROM golang:1.22.1-alpine3.19 AS openapi-docs

RUN go install github.com/swaggo/swag/cmd/swag@latest

WORKDIR /swag

COPY go.mod go.sum /swag/

RUN go mod download

COPY . .

RUN sh generate-api.sh

# STAGE 2: Build
FROM node:21.7.3-alpine3.19 AS react-build

WORKDIR /app

COPY package*.json /app

RUN npm i -f

COPY . .

COPY --from=openapi-docs /swag/docs /docs

RUN npm run generate-api-deploy

COPY ./src/components/openapi .

RUN npm run build

# STAGE 3: Run
FROM nginx:1.25.4-alpine3.18

COPY --from=react-build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]