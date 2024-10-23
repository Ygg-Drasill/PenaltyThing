## Configuration for .env file
Get a .env file with the following configuration: <br>
DB_HOSTNAME= //DB Ip address <br>
DB_PORT= //DB port number <br>
DB_USER= //DB Username <br>
DB_PASSWORD= //DB password in single qoutes <br>
DB_NAME= //Name for the DB

LISTEN_PORT= //DB port number

### Infisical Part (Can be found under "bigsecret on discord)
INFISICAL_CLIENT_ID=''
INFISICAL_CLIENT_SECRET=''
INFISICAL_WORKSPACE=''
INFISICAL_ENVIRONMENT=''

## START BACKEND

`cd backend`
`go run .`

## START FRONTEND
`cd frontend`
`npm ci`
`npm run generate-api`
`npm run dev`

 The homepage can be accessed at: localhost:8080/app/home
