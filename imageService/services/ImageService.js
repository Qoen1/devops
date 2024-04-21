const SubmissionImage = require('../models/SubmissionImage')

class SubmissionImageService {
    GetImage (id) {
        return new Promise((resolve, reject) => {
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

    SaveImage(file, fileType){
        return new Promise((resolve, reject) => {
            let newFile = new SubmissionImage({
                imageBuffer: file,
                imageType: fileType
            });
            newFile.save().then(data => {
                resolve(data._id)
            })
        })
    }
}

module.exports = SubmissionImageService
