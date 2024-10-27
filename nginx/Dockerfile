# STAGE 1: Load frontend image
ARG build_env
FROM ghcr.io/ygg-drasill/penaltything/frontend-${build_env}:latest as frontend_image

# STAGE 2: Build nginx image
FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

COPY --from=frontend_image /usr/share/nginx/html/ /usr/share/nginx/html/

# Install Certbot
RUN apk add --no-cache certbot certbot-nginx

RUN mkdir -p /var/www/certbot

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing