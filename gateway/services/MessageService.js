const axios = require('axios')
require('dotenv').config();
const imageServiceUrl = process.env.IMAGE_SERVICE_URL
const messageServiceUrl = process.env.MESSAGE_SERVICE_URL

class ImageService{
    GetMessage(id){
        return new Promise(async (resolve, reject) => {
            try{
                let messageResponse = await axios.get(messageServiceUrl + '/' + id)
                let imageResponse = await axios.get(imageServiceUrl + '/' + messageResponse.data.imageId, {responseType: 'arraybuffer'})

                resolve({
                    message: messageResponse.data.message,
                    image: imageResponse.data.image
                })
            }catch(e){
                reject(e)
            }
        })
    }

    GetMessages(){
        return new Promise((resolve, reject) => {
            axios.get(messageServiceUrl).then(messageServiceResponse => {
                axios.get(imageServiceUrl)

            }).then(x => {

            }).catch(x => {
                reject(x)
            })
        })
    }

    CreateMessage(message, image) {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
                formData.append('message', message)
                
            axios.post(messageServiceUrl, formData, {headers: {'Content-Type': 'multipart/form-data'}
            }).then(x => {
                if (image) {
                    const blob = new Blob([image.buffer], {type: image.mimetype})
                    formData.append('image', blob, image.name)
                    axios.post(targetimageurl, formData, {headers: {'Content-Type': 'multipart/form-data'}
                    }).then(x => {
                        resolve(x.data)
                    }).catch(x => {
                        reject(x)
                    })
                }
                else{
                    resolve(x.data)
                }
            })
        })
    }
}

module.exports = ImageService
