// Henter inn databasekobling
const { createConnection } = require("./database");

// En funksjon som setter inn informasjon i databasen
async function addUser(email, password) {
    const connection = await createConnection();
    
    connection.connect();

    
    const query = "INSERT INTO user (email, password) VALUES (?, ?)";
    connection.execute(query, [email, password]);

    connection.end();
}

// Eksporterer funksjonen slik at den kan brukes i andre filer, for eksempel app.js
module.exports = { addUser };
