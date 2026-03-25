const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

//path to the database file
const DB_PATH = path.join(__dirname, 'data', 'database.db');

//connect to database
const db = new sqlite3.Database(DB_PATH, (error) => {
    if (error) {
        console.error('Error connecting to database:', error.message);
    }
    else {
        console.log('Succesfully connected to the database!');
    }
});

//read the sql file.
const schema = fs.readFileSync(path.join(__dirname, 'data', 'schema.sql'), 'utf8');

//create database.
db.serialize(() => {
    db.exec(schema, (error) => {
        if (error) {
            console.error("Error creating database:", error.message);
        }
        else {
            console.log("Database succesfully created.")
        }
    })
})

module.exports = db;