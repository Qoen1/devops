const SubmissionImage = require('../models/image')

class ImageService {
    rabbitService

    constructor(rabbitService) {
        this.rabbitService = rabbitService
    }

    GetImage (id) {
        return new Promise((resolve, reject) => {
            console.log('getting image.js with id ' + id)
            SubmissionImage.findOne({_id: id}).then(result => {
                if(result === undefined || result === null){
                    reject({
                        statusCode: 404,
                        message: 'no target image.js exists with id ' + id
                    })
                }
                resolve(result)
            })
        })
    }

    SaveImage(file, fileType, messageId){
        return new Promise((resolve, reject) => {
            let newFile = new SubmissionImage({
                imageBuffer: file,
                imageType: fileType
            });
            newFile.save().then(data => {
                this.rabbitService.NotifyImageCreated(data._id, messageId)
                resolve(data._id)
            })
        })
    }
}

module.exports = ImageService
