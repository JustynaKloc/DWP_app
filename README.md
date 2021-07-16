# Digital Workout Programme

## Instructions for Running
Clone the repository to local machine and navigate to the directory in terminal.  
Run the following commands:
- `$npm install` (sudo may be necessary)
- `$./modules_to_install` to install the needed dependencies via script
- `$npm start` (to run the server)
	- The server should start in terminal and automatically open the localhost page.
	- If localhost does not automatically load, navigate to localhost:3000 in your browser

## Instructions for Running Backend:
- Navigate to ./dwp_backend folder first
- Run `$npm run start:dev`

## Instructions for Database Setup:

- install Postgresql
- make database based on DDL.txt
- connect to database in dwp_backend/config/config.json
  {
  "development": {
  "username": "postgres",
  "password": "admin",
  "database": "fitness",
  "host": "localhost",
  "port": 5432,
  "dialect": "postgres"
  }
  }

The backend application is automatically setup to be connected with the remote DB.

There is some sample code for interacting with the database in ./src/components/Sample.jsx.

If editing the backend, must include changes to the routes, models, and controllers.
