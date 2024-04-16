const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const promBundle = require('express-prom-bundle');

const PORT = process.env.PORT

const app = express()
var jsonParser = bodyParser.json()
const metrics_middleware = promBundle({
    includePath: true,
    includeStatusCode: true,
    normalizePath: true,
    promClient: {
        collectDefaultMetrics: {}
    }
})

app.use(jsonParser)

//routes
app.use(metrics_middleware)
app.get('/yeet', (request, response) => {
    response.send('YEETT')
})

//end routes

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = {app, server}