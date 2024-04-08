const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT

const app = express()


var jsonParser = bodyParser.json()
app.use(jsonParser)

//routes
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
