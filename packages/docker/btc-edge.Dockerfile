FROM node:16 AS base
WORKDIR /code
EXPOSE 80

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/btc-edge ./packages/btc-edge
RUN yarn install --prod

FROM dependencies AS development
COPY .eslintrc.js .prettierrc.js tsconfig.json ./
RUN yarn install
RUN yarn workspace @cryptify/btc-edge build
CMD ["yarn", "workspace", "@cryptify/btc-edge", "start:dev"]

FROM dependencies AS production
ENV NODE_ENV prod
COPY --from=development /code/packages/btc-edge/dist /code/packages/btc-edge/dist
CMD ["yarn", "workspace", "@cryptify/btc-edge", "start:prod"]
