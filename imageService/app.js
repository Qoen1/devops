const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

const app = express();


var jsonParser = bodyParser.json()
app.use(jsonParser)

//routes


//end routes

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
