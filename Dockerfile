FROM node:19.2-alpine3.15 as build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./


COPY ./ ./

RUN npm ci
RUN npm run build


FROM node:21.2.0-bookworm-slim as production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/meilisearch.toml ./meilisearch.toml
COPY --from=build /usr/src/app/meilisearch.config.mjs ./meilisearch.config.mjs
COPY --from=build /usr/src/app/start.sh ./start.sh
COPY --from=build /usr/src/app/seed_data.dump ./seed_data.dump
COPY --from=build /usr/src/app/.env ./.env

RUN apt-get update
RUN apt-get install curl -y

RUN curl -L https://install.meilisearch.com | sh
RUN chmod +x meilisearch

EXPOSE 7700

EXPOSE 80

RUN chmod +x start.sh

ENV PORT=80

CMD ./start.sh