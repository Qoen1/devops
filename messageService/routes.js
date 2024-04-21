const express = require('express')
const MessageService = require('./services/MessageService')
const RabbitService = require('./services/RabbitService')
const router = new express.Router()

const multer = require('multer')
const upload = multer()

const messageService = new MessageService(new RabbitService())

router.get('/', (request, result) => {
    messageService.GetMessages().then(response => {
        result.send(response)
    })
})

router.get('/:id', (request, result)=> {

    messageService.GetMessage(request.params.id).then(message => {
        result.send(message)
    })
})

router.post('/', upload.single('image'), (request, result)=> {
    console.log(`storing message: ${request.body.message}`)
    if(!request.file) {
        request.file = null
    }else console.log(`with an image of type: ${request.file.mimetype}`)
    
    messageService.SaveMessage(request.file?.buffer, request.file?.mimetype, request.body.message).then(value => {
        result.send({messageId: value })
    }).catch(e =>{
        console.log('X(')
    })
})

module.exports = router