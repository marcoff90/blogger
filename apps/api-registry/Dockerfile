FROM node:lts-alpine
WORKDIR /app
COPY ./package-lock.json .
COPY ./api-registry.json .
COPY ./dist/apps/api-registry .
ENV PORT=4444
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs express pino-pretty doctrine swagger-parser yaml js-yaml lodash.mergewith swagger-ui-dist
CMD node ./main.js
