# Wishboard
Simple Wishboard App Build with and nextjs
# Running
## In Development mode
`docker compose -f docker-compose.dev.yml up --build`

## In Production Mode
### For first time
`docker compose up -d`

### For Subsequent times
1. Delete the folders ./data/config and ./data/db This will delete all old data

2. Run `docker compose build --no-cache` This will build the containers again

3. Run `docker compose up`
