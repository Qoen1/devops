const express = require('express')
const ImageService = require('./services/ImageService')
const RabbitService = require('./services/RabbitService')
const router = new express.Router()

const multer = require('multer')
const upload = multer()

const imageService = new ImageService(new RabbitService())
router.get('/:id', upload.single('image'), (request, result, next)=>{

    imageService.GetImage(request.params.id).then(image => {
        result.contentType(image.imageType)
        result.send(image.imageBuffer)
    })
})

module.exports = router