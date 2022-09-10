FROM node:16-slim AS base
WORKDIR /code
EXPOSE 8080

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/api ./packages/api
RUN yarn install --prod

FROM dependencies AS development
COPY .eslintrc.js .prettierrc.js tsconfig.json ./
RUN yarn install

FROM dependencies AS production
RUN yarn workspace @cryptify/api build
CMD ["yarn", "workspace", "@cryptify/api", "start:prod"]
