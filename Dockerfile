ARG NODE_ENV
ARG PORT
ARG MONGO_URI
ARG MONGO_DB_NAME
ARG JWT_SECRET
ARG APP_URL

FROM --platform=linux/amd64 node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV MONGO_DB_NAME=${MONGO_DB_NAME}
ENV JWT_SECRET=${JWT_SECRET}
ENV APP_URL=${APP_URL}

EXPOSE 3000

CMD ["pnpm", "start"]
