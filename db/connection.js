const { Sequelize } = require('sequelize');


const db = new Sequelize(process.env.DATABASE,process.env.DBUSER,process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: 'mysql'
});

module.exports = db;