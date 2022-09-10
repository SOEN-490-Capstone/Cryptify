FROM node:16-slim AS base
WORKDIR /code
EXPOSE 8080

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/api ./packages/api
RUN yarn install --prod

FROM dependencies AS development
RUN yarn install
RUN npm run build

FROM base AS production

COPY --from=dependencies /code/node_modules /code/node_modules
COPY --from=development /code/build /code/build
COPY --from=development /code/package.json /code
COPY --from=development /code/.env /code
CMD ["npm", "run", "start"]
