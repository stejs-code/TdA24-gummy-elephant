#!/bin/bash

source .env


echo "meilisearch"
/usr/src/app/meilisearch --config-file-path /usr/src/app/meilisearch.toml --import-dump /usr/src/app/seed_data.dump &

node -v
node --env-file=.env server/entry.express.mjs &

redis-server -v
redis-server &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?