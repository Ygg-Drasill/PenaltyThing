FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

ARG BUILD_ENV

FROM ghcr.io/ygg-drasill/penaltything/frontend-dev:latest as frontend-dev
FROM ghcr.io/ygg-drasill/penaltything/frontend-prod:latest as frontend-prod

FROM frontend-${BUILD_ENV} as selected-frontend

COPY --from=selected-frontend /usr/share/nginx/html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing