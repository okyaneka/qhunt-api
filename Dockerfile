# stage build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

# Stage 2
FROM node:20-alpine

LABEL org.opencontainers.image.source=https://github.com/okyaneka/qhunt-api
LABEL org.opencontainers.image.description="QHunt Api Image"

WORKDIR /usr/src/app

ARG NODE_ENV=production
ARG PORT=3000

COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/pnpm-lock.yaml .
COPY --from=build /usr/src/app/tsconfig.json .
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g pnpm
RUN pnpm install

ENV NODE_ENV=${NODE_ENV}

EXPOSE ${PORT}

CMD ["pnpm", "start"]
