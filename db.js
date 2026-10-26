const db = require("mysql2");

const connection = db.createConnection({
    host:"localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database:"middleware"
});

connection.connect((err)=>{
    if(err){
        console.log("Error while creating DB", err);
    }
    console.log("Db connected successfully");
});


module.exports = connection;