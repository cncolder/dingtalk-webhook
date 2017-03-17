FROM node:alpine

MAINTAINER Colder

ENV WORKDIR /home/node/app

WORKDIR $WORKDIR

COPY lib ./
COPY package.json ./

RUN yarn install

EXPOSE 3000
