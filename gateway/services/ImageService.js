const axios = require('axios')
require('dotenv').config();
const imageServiceUrl = process.env.IMAGE_SERVICE_URL

class ImageService{
    GetImage(id){
        return new Promise((resolve, reject) => {
            axios.get(imageServiceUrl + '/' + id, {responseType: 'arraybuffer'}).then(x => {
                resolve(x)
            }).catch(x => {
                reject(x)
            })
        })
    }
}

module.exports = ImageService
