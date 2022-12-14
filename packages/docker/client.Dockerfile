FROM node:16-slim AS base
WORKDIR /code
EXPOSE 19006

FROM base AS dependencies
COPY package.json yarn.lock ./
COPY packages/common ./packages/common
COPY packages/client ./packages/client
RUN yarn install

FROM dependencies AS development
COPY .eslintrc.js .prettierrc.js tsconfig.json ./
CMD ["yarn", "workspace", "@cryptify/client", "web"]
