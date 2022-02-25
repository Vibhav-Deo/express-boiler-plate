FROM node:16-alpine
RUN npm install -g nodemon
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN apk add --no-cache bash
COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
CMD [ "npm", "run", "build"]
COPY ./dist /usr/src/app
EXPOSE 8000