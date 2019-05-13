FROM node:10.15-alpine

# We have to install Git or most NPM installs are going to fail.
RUN apk add --update git

WORKDIR /app
COPY package.json /app

# This skips all of the Node packages needed only for development (for example, webpack).
RUN npm install --production

COPY src /app/src
COPY variables.env /app

CMD npm run server
