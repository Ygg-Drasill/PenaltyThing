FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

COPY --from=ghcr.io/ygg-drasill/penaltything/frontend-dev:dev /usr/share/nginx/html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing