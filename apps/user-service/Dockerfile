FROM node:lts-alpine
WORKDIR /app
COPY .env.docker .
COPY package-lock.json .
COPY apps/api-registry/src/config/swagger-docs.js .
COPY ./dist/apps/user-service .
ENV PORT=3000
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs express pino-pretty doctrine swagger-parser yaml js-yaml lodash.mergewith swagger-ui-dist
CMD node ./main.js
