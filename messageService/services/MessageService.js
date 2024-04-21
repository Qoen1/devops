const Message = require('../models/message')

class CompetitionService{
    SaveMessage(file, fileType, message){
        return new Promise((resolve, reject) => {
            let newMessage = Message({
                message: message
            });
            newMessage.save().then(data => {
                resolve(data)
            });
        });
    }

    AddImage(imageId, messageId){
        return new Promise((resolve, reject) => {
            Message.findOne({ _id: messageId }).then(message => {
                message.imageId = imageId
                message.save()
            }).then(message => {
                resolve(message)
            })
        })
    }

    GetMessage(id) {
        return new Promise((resolve, reject) => {
            Message.findOne({ _id: id }).then(message => {
                if (!message) {
                    reject({ status: 404, message: "message not found." })
                }
                resolve({ status: 200, message: message })
            }).catch( error => {
                console.error('Error fetching competition:', err)
                reject({ status: 500, message: "Internal server error." })
            })
        })
    }

    GetMessages() {
        return new Promise((resolve, reject) => {
            Message.find().then(messages => {
                resolve({ status: 404, message: "No submissions found for the competition." })
            }).catch(error => {
                reject({ status: 500, message: "Internal server error." })
            })
        })
    }
}

module.exports = CompetitionService
