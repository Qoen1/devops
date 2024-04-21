﻿const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const amqp = require('amqplib')
const promBundle = require('express-prom-bundle');

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(x => console.log(`connected to database ${DB_URL}`))

const app = express()
const metrics_middleware = promBundle({
    includePath: true,
    includeStatusCode: true,
    normalizePath: true,
    promClient: {
        collectDefaultMetrics: {}
    }
})

//routes
app.use('/', require('./routes'))
app.use(metrics_middleware)

//end routes

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
