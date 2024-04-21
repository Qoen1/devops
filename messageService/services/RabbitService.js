const amqp = require('amqplib');
require('dotenv').config();
const rabbitMQUrl = process.env.RABBIT_URL;
const exchange = 'yeetusdeletus'
const exchangeType = 'topic'
const queue = 'messageServiceQueue'
const routingKeys = {
  messageAddKey: '#.Message.#.Add.#',
  imageAddKey: '#.Image.#.Add.#',
}
const MessageService = require('./MessageService')

let connection
let channel

class RabbitService{
  messageService
  constructor() {
    this.messageService = new MessageService(this)

    if(connection && channel) return

    amqp.connect(rabbitMQUrl, { resubscribe: true }).then(x => {
      connection = x
      console.log(`connected to rabbitMQ ${rabbitMQUrl}`)
      connection.createChannel().then(y => {
        channel = y
        channel.assertExchange(exchange, exchangeType, {durable: true})
        this.SubscribeToImageCreated()
      })
    })
  }

  NotifyMessageCreated(image, fileType, messageId){
    console.log(`notifying message created ${messageId} of type ${fileType}`)
    channel.publish(exchange, routingKeys.messageAddKey, Buffer.from(JSON.stringify({
      image: image,
      fileType: fileType,
      messageId: messageId
    })))
  }

  SubscribeToImageCreated(){
    channel.assertQueue(queue).then(() => {
      channel.bindQueue(queue, exchange, routingKeys.imageAddKey)
    }).then(() => {
      channel.consume(queue, async message => {
        await this.HandleImageCreated(message)
      })
    })
  }

  async HandleImageCreated(message){
    const content = JSON.parse(message.content)
    console.log(`received image created message ${message.content}`)
    await this.messageService.AddImage(content.imageId, content.messageId)
    channel.ack(message)
  }
}

module.exports = RabbitService
