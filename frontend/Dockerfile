# STAGE 1: Build
FROM node:21.7.3-alpine3.19 as react-build

RUN npm cache clear --force

WORKDIR /app

COPY package*.json /app

RUN npm i -f

COPY . .

RUN npm run build

# STAGE 2: Run
FROM nginx:1.25.4-alpine3.18

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]