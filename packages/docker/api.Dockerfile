FROM node:16 AS base
WORKDIR /code
EXPOSE 80

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/api ./packages/api
RUN yarn install --prod

FROM dependencies AS development
COPY .eslintrc.js .prettierrc.js tsconfig.json ./
RUN yarn install
RUN yarn workspace @cryptify/api build
CMD ["yarn", "workspace", "@cryptify/api", "start:dev"]

FROM dependencies AS production
COPY --from=development /code/packages/api/dist /code/packages/api/dist
CMD ["yarn", "workspace", "@cryptify/api", "start:prod"]
