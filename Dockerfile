FROM node:19.2-alpine3.15 as build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build


FROM debian:12 as production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/meilisearch.toml ./meilisearch.toml
COPY --from=build /usr/src/app/meilisearch.config.mjs ./meilisearch.config.mjs
COPY --from=build /usr/src/app/start.sh ./start.sh

RUN apt-get update
RUN apt-get install curl -y
RUN curl -L https://install.meilisearch.com | sh
RUN chmod +x meilisearch

EXPOSE 7700

RUN apt-get install nodejs -y
EXPOSE 80

RUN chmod +x start.sh

CMD ./start.sh