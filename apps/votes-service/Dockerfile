FROM node:lts-alpine
WORKDIR /app
COPY ./package-lock.json .
COPY ./votes-service.json .
COPY ./dist/apps/votes-service .
ENV PORT=8080
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs express pino-pretty doctrine swagger-parser yaml js-yaml lodash.mergewith swagger-ui-dist
CMD node ./main.js
