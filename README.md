# QHUNT API

## Run

```bash
# install
pnpm install

# run
# dont forget to config the hosts
docker compose up -d


pnpm dev

# build
pnpm build

# start
pnpm start
```

## Docker

```bash
docker build -t qhunt .
docker tag qhunt:latest <repository>/<image_name>:<tag>
```
