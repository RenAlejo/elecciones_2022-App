
const { DataTypes } = require('sequelize');
const db = require('../db/connection');


const Tipologia = db.define('tipologia',{
    desc_tipologia: {
        type: DataTypes.STRING
    },
    codigo_tipologia: {
        type: DataTypes.INTEGER
    },
});

module.exports = Tipologia;