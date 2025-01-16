const express = require("express");
const app = express();
const port = 3000;
const { addUser } = require("./database/services"); // Henter funkjsonen som vi eksporterte i services
const bodyParser = require("body-parser"); // Hjelper oss å hente ut req.body
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Middleware for å parse URL-encoded data (f.eks. fra skjemaer)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for å parse JSON-data
app.use(bodyParser.json());

// Setter opp EJS som malmotor for å rendere HTML-sider
app.set("view engine", "ejs");

// Rute for hovedsiden (GET forespørsel)
app.get("/", (req, res) => {
    res.render("index");
});

// Rute for å håndtere skjema innsending (POST forespørsel)
app.post("/", (req, res) => {
    const input = req.body.carType; // Henter data fra input-feltet med navnet "carType" i skjemaet
    InsertCarInfoIntoDatabase(input); // Kaller funksjonen for å lagre data i databasen
    return res.redirect("/"); // Omdirigerer brukeren tilbake til hovedsiden
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const email = req.body.email; 
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
        // Store hash in your password DB.
        addUser(email, hashedPassword); 
    });

    
    return res.redirect("/signup");
});

// Starter serveren og lytter på port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
