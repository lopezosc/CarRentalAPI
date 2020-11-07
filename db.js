const Pool = require('pg').Pool;
const Sequelize = require('sequelize');

const pool = new Pool({
    user: "Oscar",
    password: "apples",
    database: "AutoRental",
    host: "localhost",
    port: 5432
})


const db = new Sequelize('AutoRental', 'Oscar', 'apples',{
    host: 'localhost',
    dialect: 'postgres',
    //operatorsAliases: false,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});
;

module.exports = pool , db;




