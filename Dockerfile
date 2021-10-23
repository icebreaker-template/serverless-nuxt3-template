FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn --prod

COPY ./.output /usr/src/app/.output

EXPOSE 9000

ENTRYPOINT ["yarn" ,"start"]