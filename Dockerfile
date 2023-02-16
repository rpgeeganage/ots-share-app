#########################
# OTS-Share
#########################
FROM node:18.13.0-alpine as ots-share

WORKDIR /app

COPY ./ /app

RUN npm set progress=false && npm ci

ENV NODE_ENV=prod
