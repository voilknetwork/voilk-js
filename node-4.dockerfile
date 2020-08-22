FROM node:4
ADD ./package.json /voilkjs/package.json
WORKDIR /voilkjs
RUN npm install
ADD . /voilkjs
RUN npm test
