############
# Base image
############
FROM node:18.13.0-alpine as base-image-ots-share

WORKDIR /app

COPY package.json /app/

############
# Image for dependencies
############
FROM base-image-ots-share as dependencies-ots-share

COPY package-lock.json /app/

RUN npm set progress=false && \
    npm install --omit=dev

#########################
# Image for dependencies
#########################
FROM base-image-ots-share as develop-ots-share

ENV NODE_ENV=development-ots-share

RUN npm set progress=false && \
    npm install

COPY ./ /app
