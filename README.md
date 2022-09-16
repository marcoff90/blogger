# Blogger

This project was generated using [Nx](https://nx.dev).

ABOUT
- the project applies microservices architecture
- data validation is provided by zod validation
- application use redis cache for caching data and rabbit mq for internal communication as well as direct api calls 
  through axios
- docs written with swagger
  - in local dev all the application use swagger jsdoc library for generating the docs from yaml comment
  - when the app starts on local env, the DOCKER env. variable is set to 'false' which lets the application save the generated docs to json file which is then used in docker containers for running the swagger ui
- can be run using docker
- the services
  - api registry
    - stores data of each service in database
    - each service sends post request to registry when it's restarted -> the data is updated
    - if registry receives an update it publishes a message to rabbitmq direct exchange for api gateway
    - if registry fails, the registrator util will publish data to rabbitmq and registry will consume the data later 
      when it's online
    - the registry is protected by api key stored in .env file so user never contacts the registry
  - api gateway
    - proxy for communication with the services
    - on start of the application it loads the data about each service from registry which it uses to create it's own swagger docs and those can be used to create api client, the data is stored in redis cache for 24 hours. The app listens on rabbit mq and in case of change in registry, it reloads the fresh data and recaches them.
    - the data is used for filtering the requests and forwarding the requests to corresponding service
  - user-service
    - responsible for user management
    - flow explained in swagger docs
  - blogger-service
    - responsible for management of articles
    - public and admin part
    - complete info in swagger docs
  - comments-service
    - responsible for management of article comments
    - comments are nested to the level 4 and order by created_at property
      - each comment has parent_id
      - when creating a new comment, we check the parent depth, if the depth is 4, we assing the parent's parent_id 
        to the new comment so they stay on the same level and the nesting doesn't go deeper
    - comments are connected to article id passed in path
    - when adding new comment, the application loads all article ids (from cache or from blogger on internal api) 
      and compares if the article exists
  - votes-service
    - responsible for management of upvotes/downvotes on comments
    - votes are unique per article id, comment id and ip address
    - votes can be changed
    - votes are automatically deleted when article is deleted
    - when adding a new vote, the app loads all comments ids (from cache or from comments on internal api) and 
      compares if the article exists
  - graphql-service
    - graphql endpoint which uses apollo server to connect through RestDataSource to blogger, comment and vote 
      service in order to get full info about articles including comments and votes
    - read only
    - connected through gateway so there's still one entry point
    - you can find Postman collection for graphql with queries in directory postman-graphql-api

PREREQUISITES
- installed locally postgresql, redis and rabbitmq
- if not installed you can use docker-compose file where you can create instances of these services (in case of postgresql change the host in .env accordingly)

DB
- project uses Sequelize to handle database queries
- to migrate the db use
  - npx sequelize-cli db:migrate --env {name of project -> can be found in ./config/database/config/config.js -> for 
    each project different db}
    - and accordingly to [sequelize documentation use](https://sequelize.org/docs/v6/other-topics/migrations/) --from and --to to migrate just specific files into specific 
      databases since each service uses it's own database
- seed the databases with data
  - for users
    - npm run db:seed:users
  - for articles
    - npm run db:seed:articles
  - for comments
    - npm run db:seed:comments
  - for votes
    - npm run db:seed:votes

INIT PROJECT
- for running locally
  - copy .sample.env and make it .env file, fill out the needed environment variables at the top of the file
  - run npm install to install dependencies
  - start redis, rabbitmq and postgresql (either locally or using each service alone from docker compose -> there are also services for each app and their containers haven't been build yet)
  - initialize the apps
    - api-registry
      - npm run dev:api-registry
    - user-service
      - npm run dev:user-service
    - api-gateway
      - npm run dev:api-gateway
    - blogger-service
      - npm run dev:blogger-service
    - comments-service
      - npm run dev:comments-service
    - votes-service
      - npm run dev:votes-service
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
