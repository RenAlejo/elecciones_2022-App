require('dotenv').config();
const Server = require('./models/server.js');
const Database = require('./models/db.js');

const server = new Server();
const db =  new Database();

server.listen();
db.connectDb();