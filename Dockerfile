FROM node:16-alpine

# minimize image size
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./package*.json ./

RUN npm ci && npm install pm2 -g

COPY ./ ./ 

EXPOSE 3000

