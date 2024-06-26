﻿const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const amqp = require('amqplib')
const promBundle = require('express-prom-bundle');

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const RABBIT_URL = process.env.RABBIT_URL;

mongoose.connect(DB_URL).then(x => console.log(`connected to database ${DB_URL}`))

const app = express()
const jsonParser = bodyParser.json()
const metrics_middleware = promBundle({
    includePath: true,
    includeStatusCode: true,
    normalizePath: true,
    promClient: {
        collectDefaultMetrics: {}
    }
})

app.use(jsonParser)
amqp.connect(RABBIT_URL, {resubscribe: false}).then(x => console.log(`connected to rabbitMQ ${RABBIT_URL}`))

//routes
app.use(metrics_middleware)
app.get('/yeet', (request, response) => {
    response.send('YEETTT')
})

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
