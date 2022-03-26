FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
COPY ./tsconfig.json /usr/src/app/
RUN npm install -g typescript
COPY . .
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source

FROM node:16-alpine as final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist /usr/src/app
COPY --from=build /usr/src/app/package.json /usr/src/app
COPY --from=build /usr/src/app/package-lock.json /usr/src/app
RUN apk add --no-cache bash
RUN npm install --production
EXPOSE 8000