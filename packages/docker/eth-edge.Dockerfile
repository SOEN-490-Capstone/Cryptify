FROM node:16 AS base
WORKDIR /code
EXPOSE 80

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/eth-edge ./packages/eth-edge
RUN yarn install --prod

FROM dependencies AS development
ENV NODE_ENV dev
COPY .eslintrc.js .prettierrc.js tsconfig.json ./
RUN yarn install
RUN yarn workspace @cryptify/eth-edge build
CMD ["yarn", "workspace", "@cryptify/eth-edge", "start:dev"]

FROM dependencies AS production
ENV NODE_ENV prod
COPY --from=development /code/packages/eth-edge/dist /code/packages/eth-edge/dist
CMD ["yarn", "workspace", "@cryptify/eth-edge", "start:prod"]
