how to run?
1. docker-compose up -d --build
2. docker-compose exec crud npm run migrate:fresh

api crud in localhost:3000
websocket in localhost:3001

wanna change mongodb to mysql?
1. cd ./crud
2. change DATABASE_APP to mysql
3. docker-compose up -d --build crud