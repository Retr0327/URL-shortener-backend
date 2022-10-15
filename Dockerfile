FROM node:16-bullseye as builder

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm config set auto-install-peers true

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN pnpm i

RUN pnpm install pm2

COPY . /app

RUN pnpm prisma generate

RUN pnpm build

FROM node:16-bullseye as release 

RUN apt-get update && apt -y upgrade 

RUN apt-get install -y build-essential dnsutils && apt-get clean

RUN npm install -g pnpm

RUN pnpm config set auto-install-peers true

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/deployment ./deployment 