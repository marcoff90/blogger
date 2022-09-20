# Blogger

This project was generated using [Nx](https://nx.dev).

ABOUT BACKEND
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
    - graphql-service
      - npm run dev:graphql-api
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

DIAGRAM
![Alt text](https://github.com/marcoff90/blogger/blob/main/assets/app-diagram.png)

ABOUT FRONTEND
- app is build in React using Nx
- to start the app
  - npm run dev:blogger-frontend
- Api Client (axios/typescript) is generated through open api tools
  - npm run generate:api {address to docs.json = http://localhost:3333/docs.json}
  - when the client is generated, it's necessary to manually add 'override' to name of Error class in the api folder
- The project uses React Query for fetching the data
- UI is build with MUI library

- The app is divided into two parts
  - Public
    - routes
      - '/'
        - home page -> Five featured articles obtained from API
        - the articles show title, perex, link in username which takes to user's blog page where more of articles 
          by the user can be read
        - link in Read whole article which takes to the whole content of article
        - both of the links start up condition to render 'Recent articles' in menu which is specifically for 
          specific blogger based on username in path
      - '/blogs/:username/articles'
        - list of articles by one of the bloggers
        - articles are sorted by date
        - articles are listed by 5 per page with pagination
      - '/blogs/:username/articles/:articleId'
        - one article by specific user
        - related articles on side -> link in title of the article
        - articles are written in Markdown and rendered using ReactMarkdown library
        - add the bottom of the page comment section
          - comments are nested
          - user can add comment as a parent comment or join the discussion
          - nested comments are hidden and are visible after clicking 'Show more' and can be rolled back
          - same for joining the conversation
          - the root comments are paginated by 5
      - '/users/login'
        - login page with simple login form
        - react-hook-form library used for all forms
        - user can log in, reset password or register through the links in the form
      - '/users/forgotten-password'
        - takes email and notifies user he needs to check his mail
      - '/users/register'
        - sign up form
      - after succesfull registration user gets email with link which takes him to activation page, where he chooses 
        avatar
      - after reset the link in mail takes user to reset password form
  - Admin
    - accessible only after succesfull auth
    - the routes are protected using useContext and AuthProvider
    - after succesfull login the response containing user id, token, username and avatar is stored in the context 
      and used across the application
    - after login
      - '/admin/my-articles'
        - shows list of articles in data grid by MUI allowing sorting, selecting more
        - the admin user can read the article by choosing corresponding button in the data grid
        - edit the article
        - delete the article or more articles at once
      - 'admin/new-article'
        - uses same component for editing and creating new article
        - takes all the info about article
        - editor in markdown using @uiw/react-md-editor library
        - the article can be saved either as draft or directly published
      - '/admin/edit-article/:articleId'
        - edits the article within the same component
        - prefills the data of the article


































