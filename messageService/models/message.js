const mongoose = require('mongoose');
const {Schema} = mongoose;

var messageSchema = new mongoose.Schema({
    imageId: {type: mongoose.Types.ObjectId, required: false},
    message: {type: String, required: true}
});

module.exports = mongoose.model('message', messageSchema);
