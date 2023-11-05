#!/bin/bash

/usr/src/app/meilisearch --config-file-path /usr/src/app/meilisearch.toml &

# Start the second process
node server/entry.fastify &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?