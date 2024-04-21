const axios = require('axios')
require('dotenv').config();
const imageServiceUrl = process.env.IMAGE_SERVICE_URL
const messageServiceUrl = process.env.MESSAGE_SERVICE_URL

class MessageService{
    GetMessage(id){
        console.log(`getting message ${id}`)
        return new Promise(async (resolve, reject) => {
            try{
                let messageResponse = await axios.get(messageServiceUrl + '/' + id)
                console.log(`got message:`)
                console.log(messageResponse.data)
                let imageResponse = await axios.get(imageServiceUrl + '/' + messageResponse.data.message.imageId, {responseType: 'arraybuffer'})

                resolve({
                    imageType: imageResponse.headers['content-type'],
                    message: messageResponse.data.message,
                    image: imageResponse.data
                })
            }catch(e){
                reject(e)
            }
        })
    }

    GetMessages(){
        return new Promise((resolve, reject) => {
            axios.get(messageServiceUrl).then(messageServiceResponse => {
                resolve(messageServiceResponse.data)
            }).catch(x => {
                reject(x)
            })
        })
    }

    CreateMessage(message, image) {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('message', message)
            
            if (image) {  
                console.log('adding image to request')
                const blob = new Blob([image.buffer], {type: image.mimetype})
                formData.append('image', blob, image.name)
            }    

            axios.post(messageServiceUrl, formData, {headers: {'Content-Type': 'multipart/form-data'}
            }).then(x => {
                resolve(x.data)
            })
        })
    }
}

module.exports = MessageService
