# Configuration for .env file
Get a .env file with the following configuration:
DB_HOSTNAME= //DB Ip address
DB_PORT= //DB port number
DB_USER= //DB Username
DB_PASSWORD= //DB password in single qoutes
DB_NAME= //Name for the DB

LISTEN_PORT= //DB port number

## START BACKEND

`cd backend`
`go run .`

## START FRONTEND
`cd frontend`
`npm ci`
`npm run generate-api`
`npm run dev`

 The homepage can be accessed at: localhost:8080/app/home
