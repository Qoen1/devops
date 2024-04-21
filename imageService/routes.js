const express = require('express');
const SubmissionImageService = require('../services/SubmissionImageService');
const router = new express.Router();

const multer = require('multer')
const upload = multer()

const submissionImageService = new SubmissionImageService()
router.get('/:id', upload.single('image'), (request, result, next)=>{

    submissionImageService.GetImage(request.params.id).then(image => {
        result.contentType(image.imageType)
        result.send(image.imageBuffer)
    })
})

module.exports = router