##Description

A node js backend web api for fetching book data

##Requirements

- Node.js
- Express
- Docker
- docker-compose

##Set Up

# Running without Docker

- rename ".env.sample" to ".env" and set environment variables with db connections and port
- Run "npm install" in terminal
- Run "npm run test" to run tests
- Run "npm run dev" to launch api
- Access application on "http://localhost:{port}" (default port is 3000, replace with port if PORT ENV is set)
- Access application's api documentation on "http://localhost:{port}/api/docs"


# Running with Docker

- rename ".env.sample" to ".env" and set environment variables with db connections and port
- Run "docker-compose up -d" in terminal
- Access application on "http://localhost:3000"
- Access application's api documentation on "http://localhost:3000/api/docs"