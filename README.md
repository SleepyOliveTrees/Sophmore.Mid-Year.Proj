# _**directory layout:**_

## _**assets**_ folder: 
- css folder, which has the styles.css file, and a task_styles.css file. All css files will go here
- js folder, contains app.js and taskapp.js, as well as any other js files

## _**backend**_ folder: 
- config folder: contains db.js
- controllers: taskController.js
- models: taskModel.js
- routes: taskRoutes.js
- .env: we need the fields that are inside this file filled out 
    - PORT=5000
    - DB_HOST=sqlclassdb-instance-1.cqjxl5z5vyvr.us-east-2.rds.amazonaws.com
    - DB_USER=oliviasmith
    - DB_PASSWORD=
    - DB_DATABASE=mid_year_project
    - DB_PORT=3306
- package.json: scripts needed to start server
- server.js: main file used to start server code

## one time installation
 open git bash and run the commands below
1. `cd backend`
2. `npm init -y`
3. `npm install express cors mysql2 dotenv`
4. `npm install --save-dev nodemon`

## starting server
run command `npm run dev`
* server runs on port 5000, to test if it connects to the database, check http://localhost:5000/ on your browser, db should show up as connected

## starting client
click on the liveserver button on vscode to go live