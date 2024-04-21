const amqp = require('amqplib');
require('dotenv').config();
const rabbitMQUrl = process.env.RABBIT_URL;
const exchange = 'yeetusdeletus'
const exchangeType = 'topic'
const queue = 'imageServiceQueue'
const routingKeys = {
  messageAddKey: '#.Message.#.Add.#',
  imageAddKey: '#.Image.#.Add.#',
}
const ImageService = require('./ImageService')

let connection
let channel

class RabbitService{
  imageService
  constructor() {
    console.log(`creating rabbit service`)
    this.imageService = new ImageService(this)

    amqp.connect(rabbitMQUrl, { resubscribe: true }).then(x => {
      connection = x
      console.log(`connected to rabbitMQ ${rabbitMQUrl}`)
      connection.createChannel().then(y => {
        console.log(`created channel`)
        channel = y
        channel.assertExchange(exchange, exchangeType, {durable: true})
        this.SubscribeToMessageCreated()
      })
    }).catch(err => {
      console.log(`error connecting to rabbitMQ ${rabbitMQUrl}`)
      console.log(err)
    })
  }

  SubscribeToMessageCreated(){
    console.log(`subscribing to message created`)
    channel.assertQueue(queue).then(() => {
      channel.bindQueue(queue, exchange, routingKeys.messageAddKey)
    }).then(() => {
      channel.consume(queue, async message => {
        await this.HandleMessageCreated(message)
      })
    })
  }

  NotifyImageCreated(imageId, messageId){
    console.log(`notifying image created ${imageId}`)
    channel.publish(exchange, routingKeys.imageAddKey, Buffer.from(JSON.stringify({
      imageId: imageId,
      messageId: messageId
    })))
  }

  async HandleMessageCreated(message){
    const content = JSON.parse(message.content)
    console.log(`received message created message ${content.messageId}`)
    await this.imageService.SaveImage(content.image, content.fileType, content.messageId)
    channel.ack(message)
  }
}

module.exports = RabbitService
