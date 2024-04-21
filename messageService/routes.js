const express = require('express');
const MessageService = require('./services/MessageService');
const router = new express.Router();

const multer = require('multer')
const upload = multer()

const messageService = new MessageService()

router.get('/', (request, result) => {

})

router.get('/:id', (request, result)=> {

    messageService.GetImage(request.params.id).then(image => {
        result.contentType(image.imageType)
        result.send(image.imageBuffer)
    })
})

router.post('/', upload.single('image'), (request, result)=> {
    console.log(`storing message: ${request.body.message}`)
    if(!request.file) {
        request.file = null
        console.log('with an image!')
    }
    messageService.SaveMessage(request.file?.buffer, request.file?.mimetype, request.body.message).then(value => {
        result.send({imageId: value })
    }).catch(e =>{
        console.log('X(')
    })
})

module.exports = router