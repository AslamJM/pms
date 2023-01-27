## payment management system

#### Environment Varialbles
create .env files

front end:  
  **VITE_API_URL** = backend api 

server:  
  **MONGO_DB_SERVER** = url for mongodb database  
  **PORT** = port  
  **JWT_SECRET** = secret for jwt  

to start the development server

```
cd server
yarn
yarn dev
```
make sure you have an instance of mongodb running

to start the front-end development
```
cd frontend
yarn
yarn dev
```
