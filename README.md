# full-text search

## run

> depend

```bash
docker compose -f docker-compose.yml up -d
# add ./volumes to git ignore file
```

```bash
pnpm i
pnpm start
```

## migration

```bash
pnpm exec migrate create first-migration
pnpm exec migrate create second-migration
pnpm exec migrate list
pnpm exec migrate up second-migration -s # will migrate up only second-migration
pnpm exec migrate down second-migration -s # will migrate down only second-migration
pnpm exec migrate up -s # will migrate up first-migration
pnpm exec migrate down first-migration
```

