how to run?
1. docker-compose up -d --build
2. docker-compose exec crud npm run migrate:fresh

wanna change mongodb to mysql?
1. cd ./crud
2. change DATABASE_APP to mysql
3. docker-compose up -d --build crud

api crud in localhost:3000
websocket in localhost:3001

how it's work?
you can add data on api
[GET] localhost:3000/api/v1/items
[GET] localhost:3001/api/v1/items/:id
[POST] localhost:3000/api/v1/items
[PATCH] localhost:3001/api/v1/items/:id
[DELETE] localhost:3001/api/v1/items/:id

body JSON for POST and PATCH is name and qty