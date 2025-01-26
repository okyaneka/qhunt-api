ARG NODE_ENV=production
ARG PORT=3000
ARG MONGO_URI
ARG MONGO_DB_NAME
ARG THROTTLE_TIME
ARG THROTTLE_COUNT
ARG JWT_SECRET
ARG APP_URL

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

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/pnpm-lock.yaml .
COPY --from=build /usr/src/app/tsconfig.json .
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g pnpm
RUN pnpm install

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV MONGO_DB_NAME=${MONGO_DB_NAME}
ENV THROTTLE_TIME=${THROTTLE_TIME}
ENV THROTTLE_COUNT=${THROTTLE_COUNT}
ENV JWT_SECRET=${JWT_SECRET}
ENV APP_URL=${APP_URL}

EXPOSE ${PORT}

CMD ["pnpm", "start"]
