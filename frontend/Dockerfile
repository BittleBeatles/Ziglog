FROM node:18.18.1-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn set version berry

RUN yarn

COPY . ./

RUN yarn build  

EXPOSE 3000

CMD ["yarn", "start"]
