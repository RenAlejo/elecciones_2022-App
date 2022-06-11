const  { DataTypes } = require('sequelize');
const db = require('../db/connection');
// import  { DataTypes } from 'sequelize';

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    departamento: {
        type: DataTypes.STRING
    },
    municipio: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    },
    last_login: {
        type: DataTypes.DATE
    },
    total_updates: {
        type: DataTypes.INTEGER
    }
});

module.exports = Users;