const express = require('express');
const ImageService = require('./services/ImageService')
const MessageService = require('./services/MessageService')
const router = new express.Router();

const multer = require('multer')
const upload = multer()

router.get('/', (request, result, next) => {
    let messageService = new MessageService()
    messageService.GetMessages().then(x => {
        result.send(x)
    })
})

router.get('/:id', (request, result, next) => {
    let messageService = new MessageService()
    messageService.GetMessage(request.params.id).then(x => {
        result.send(x)
    })
})

router.get('/:id/image', (request, result, next) => {
    let messageService = new MessageService()
    messageService.GetMessage(request.params.id).then(x => {
        result.send(x.image)
    })
})

router.post('/', upload.single('image'), (request, result, next) => {
    if(!request.body.message && !request.image){
        result.status(400).send("no message or image.js was provided")
    }

    let messageService = new MessageService()
    messageService.CreateMessage(request.body.message, request.image).then(x => {
        result.send(x)
    })
})

module.exports = router