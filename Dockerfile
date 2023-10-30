# Intermediate docker image to build the bundle in and install dependencies
FROM node:19.2-alpine3.15 as build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM node:19.2-alpine3.15 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/dist ./dist

ENV PORT=80

EXPOSE 80

CMD [ "node", "server/entry.fastify"]