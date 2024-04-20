const axios = require('axios')
require('dotenv').config();
const imageServiceUrl = process.env.MESSAGE_SERVICE_URL

class ImageService{
    GetMessage(id){
        return new Promise((resolve, reject) => {
            axios.get(imageServiceUrl + '/' + id, {responseType: 'arraybuffer'}).then(x => {
                resolve(x)
            }).catch(x => {
                reject(x)
            })
        })
    }

    GetMessages(){
        return new Promise((resolve, reject) => {
            axios.get(imageServiceUrl, {responseType: 'arraybuffer'}).then(x => {
                resolve(x)
            }).catch(x => {
                reject(x)
            })
        })
    }

    CreateMessage(message, image) {
        return new Promise((resolve, reject) => {
            axios.post(imageServiceUrl, {responseType: 'arraybuffer'}).then(x => {
                const formData = new FormData()
                const blob = new Blob([image.buffer], {type: image.mimetype})
                formData.append('message', message)
                if (image) {
                    formData.append('image', blob, image.name)
                }

                axios.post(targetimageurl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(x => {
                    resolve(x.data)
                }).catch(x => {
                    reject(x)
                })
            })
        })
    }
}

module.exports = ImageService
