# Express-boiler-plate

## **Typescript repository for express**

## Running the boilerplate

### Create env file

- If you are running the boilerplate without docker-compose you would need to create an env file which has the following env variables. Please substitute correct values where needed.
  **If you are using this without docker compose make sure that mongo db is installed and is running**
  ```
  1. DEBUG=SERVER:*
  2. APP_SECRET=[secret to be used for JWT]
  3. PORT=[port number to be used]
  4. HOST=[host name to be used]
  5. ENVIRONMENT=local //if local seed data would be inserted in DB
  6. APPLICATION_NAME=[application name to used for boiler plate]
  7. ADAPTER=mongodb
  8. DB_HOST=mongodb
  9. DB_PORT=27017
  10. DB_NAME=[name of the db to connect to]
  11. DB_USER=[name of the user in mongo to connect to]
  12. DB_PASSWORD=[password of the user]
  13. AUTH_SOURCE=admin
  ```
- To access swagger without docker compose use
  > http://hostname:portnumber/api-docs

### Running with docker-compose

- To build and start
  > docker compose --file docker-compose.yml up --build
- To stop
  > docker compose down
- To access swagger when running with docker-compose use
  > http://0.0.0.0:8000/api-docs
