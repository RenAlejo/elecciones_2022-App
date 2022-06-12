const { Sequelize } = require('sequelize');


const db = new Sequelize(process.env.DATABASE,process.env.DBUSER,process.env.DBPASS, {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'mysql'
});

module.exports = db;