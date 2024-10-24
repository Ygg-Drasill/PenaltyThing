# STAGE 1: Load frontend image
ARG build_env
FROM ghcr.io/ygg-drasill/penaltything/frontend-${build_env}:latest as frontend_image

# STAGE 2: Build nginx image
FROM nginx:alpine

# Install Certbot and other necessary packages
RUN apk add --no-cache certbot certbot-nginx openssl bash

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

COPY --from=frontend_image /usr/share/nginx/html/ /usr/share/nginx/html/

# Make a directory for Certbot to work
RUN mkdir -p /var/www/certbot

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing

# Add a command to initialize Certbot
CMD ["sh", "-c", "nginx -g 'daemon off;' & certbot --nginx --non-interactive --agree-tos --email srams@cyber-wizard.com --redirect --expand --domains penaltything.social && nginx -s reload"]
