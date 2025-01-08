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

You can create bash script from this

```bash
tag="ghcr.io/<username>/qhunt-api:${sha}"
docker build -t $tag .
sha=$(git rev-parse HEAD)
docker push $tag
echo "$tag success"
```
