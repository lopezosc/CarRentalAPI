
const Sequelize = require('sequelize');
const db = require('../db2');


const Equipment = db.define('equipment',{
    id:{
        field:'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    make:{
        field: 'make',
        type: Sequelize.STRING, 
    },
    model:{
        field: 'model',
        type: Sequelize.STRING, 
    },
    year:{
        field: 'year',
        type: Sequelize.INTEGER, 
    },
    Tag:{
        field: 'Tag',
        type: Sequelize.STRING, 
    },
    Mileage:{
         field: 'Mileage',
         type: Sequelize.INTEGER, 
    },
    Avail:{
        field: 'Avail',
        type: Sequelize.BOOLEAN, 
    }
},{
    timestamps: false
});

module.exports = Equipment;

