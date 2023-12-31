Front-end of the EseduLan registration app

To create a production build, 
clone this repository
and run the command 'npm run build' in the root directory.


# EmailJS setup

[Link](https://esedu-my.sharepoint.com/:p:/g/personal/tatu_miinalainen_esedulainen_fi/EX-7JzNswaBKg-iaSg4kmJ8BOVmxuIkYxuqo3FG0XSVZpw?e=th5ALk) to EmailJs setup guide (The provided link is restricted to users with Etelä-Savon Koulutus Oy organization accounts only.)


# EseduLAN backend

The backend for the EseduLAN project

## Requirements

Node.js

MongoDB


## Usage

```bash
npm i
npm start
```
[MongoDB database creation](https://www.mongodb.com/basics/create-database)

## Setup

Configure in /utils/config.js

Create a .env file and list your required variables

```bash
MONGODB_URI
PORT
SECRET
PASS
```

## Creating an admin account
You can either modify the code to allow creation of accounts without tokens, or do the dirty work yourself.

Create a collection in your database named "users" and create a document following the example below.

```
_id: ObjectId('6412fb5092db75e8af919ec2')
username: "admin"
passwordHash: "yourpwhashgoeshere"
__v: 1
```
The types for the fields are in order as follows: ObjectId, String, String, Int32

[Generate a password hash](https://bcrypt-generator.com/)
