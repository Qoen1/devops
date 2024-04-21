const mongoose = require('mongoose');
const {Schema} = mongoose;

var imageSchema = new mongoose.Schema({
  imageBuffer: {type: Buffer, required: true},
  imageType: {type: String, required: true},
});

module.exports = mongoose.model('image', imageSchema);
