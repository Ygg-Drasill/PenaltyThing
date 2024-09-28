FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

ARG build_env

COPY --from=ghcr.io/ygg-drasill/penaltything/frontend-${build_env}:latest /usr/share/nginx/html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing