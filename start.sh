#!/bin/bash

source .env

node -v

/usr/src/app/meilisearch --config-file-path /usr/src/app/meilisearch.toml --import-dump /usr/src/app/seed_data.dump &

# Start the second process
node --env-file=.env server/entry.fastify &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?