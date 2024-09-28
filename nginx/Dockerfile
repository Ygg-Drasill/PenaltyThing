FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-available/ /etc/nginx/conf.d/

ARG BUILD_ENV

ARG build_image=ghcr.io/ygg-drasill/penaltything/frontend-${BUILD_ENV}:latest

FROM ${build_image} as build_stage

COPY --from=build_stage /usr/share/nginx/html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.source=https://github.com/Ygg-Drasill/PenaltyThing