# Blogger

This project was generated using [Nx](https://nx.dev).

ABOUT
- the project applies automated microservices architecture
- data validation is provided by zod validation
- docs written with swagger
  - in local dev all the application use swagger jsdoc library for generating the docs from yaml comment
  - when the app starts on local env, the DOCKER env. variable is set to 'false' which lets the application save the generated docs to json file which is then used in docker containers for running the swagger ui
- can be run using docker
- the services
  - api registry
    - stores data of each service in database
    - each service sends post request to registry when it's restarted -> the data is updated
    - if registry receives an update it publishes a message to rabbitmq direct exchange for api gateway
    - the registry is protected by api key stored in .env file so user never contacts the registry
  - api gateway
    - proxy for communication with the services
    - on start of the application it loads the data about each service from registry which it uses to create it's own swagger docs and those can be used to create api client, the data is stored in redis cache for 24 hours. The app listens on rabbit mq and in case of change in registry, it reloads the fresh data and recaches them.
    - the data is used for filtering the requests and forwarding the requests to corresponding service
  - user-service
    - responsible for user management
    - flow explained in swagger docs

PREREQUISITES
- installed locally postgresql, redis and rabbitmq
- if not installed you can use docker-compose file where you can create instances of these services (in case of postgresql change the host in .env accordingly)

INIT PROJECT
- for running locally
  - copy .sample.env and make it .env file, fill out the needed environment variables at the top of the file
  - run npm install to install dependencies
  - start redis, rabbitmq and postgresql (either locally or using each service alone from docker compose -> there are also services for each app and their containers haven't been build yet)
  - you can seed the database by running
    - npm run db:seed which generates 5 users
  - initialize the apps
    - api-registry
      - npm run dev:api-registry
    - user-service
      - npm run dev:user-service
    - api-gateway
      - npm run dev:api-gateway
    - or all together
      - npm run dev:all
- for running in docker
  - copy .sample.env.docker and make it .env.docker file, fill out the needed environment variables at the top of the file
  - build the apps
    - npm run build:apps
  - build docker images
    - npm run build:docker-images
  - start docker compose
    - npm run docker:compose

DOCS
- each app has their own swagger docs at http://localhost:${PORT}/docs
