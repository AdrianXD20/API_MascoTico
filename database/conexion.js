const mysql= require('mysql2');

const env = require('dotenv').config();

const db_host= process.env.db_host;
const db_user = process.env.db_user;
const db_password= process.env.db_password;
const db_name= process.env.db_name;

const db = mysql.createConnection(
    {
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name,
    }
)

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Tu base de datos es insana broski'  )
})

module.exports = db;