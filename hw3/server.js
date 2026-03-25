//main server js for webtech assignment 3.
// Sets up express, sessions, logging, database and security, and the routes.
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const db = require("./db.js")

const app = express();
const PORT = 3000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

//session
app.use(session({
    secret: 'fazewebsite_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//start server
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});