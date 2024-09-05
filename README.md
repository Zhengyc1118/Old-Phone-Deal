# Lab03-Tue-Group01-Assignment2
## Setup database (MongoDB)

Assume you have MongoDB and MongoDB compass(GUI) setted up:
1. Open MongoDB Compass and connect to "mongodb://localhost:27017" using the **Connect** button
2. Create new database by clicking the "**+**" buttom on the top left in the **Databases** 
3. Name the database "**old_phone_deals**"
4. Name the first collection "**phonelisting**"
5. In **phonelisting** collection, press the **ADD DATA** button -> Import JSON or CSV file -> import ***phonelisting.json***
6. Create another collection in **old_phone_deals** database and name it "**userlist**"
7. In **userlist** collection, press the **ADD DATA** button -> Import JSON or CSV file -> import ***userlist.json***

## Install packages

In the root of the repository run:

```
npm install
```

change directory to views, and install required packages 

```
cd views
```

```
npm install
```

## Run the application

NOTE: You'll need two terminals to run this applications 

### Terminal 1

connect to the database

```
node server.js
```

### Terminal 2

change directory to views to run the application

```
cd views
npm run start
```
