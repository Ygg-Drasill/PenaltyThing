FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

ARG BUILD_ENV

ENV BUILD_ENV ${BUILD_ENV}

COPY --from=ghcr.io/ygg-drasill/penaltything/frontend-${BUILD_ENV}:latest /usr/share/nginx/html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing