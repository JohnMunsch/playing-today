FROM node:10.15-alpine

# We have to install Git or most NPM installs are going to fail.
RUN apk add --update git

WORKDIR /app
COPY package.json /app

RUN npm install

COPY src /app/src

CMD npm run server
