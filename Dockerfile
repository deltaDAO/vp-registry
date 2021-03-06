# Common build stage
FROM node:16.13.0 as common-build-stage

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]