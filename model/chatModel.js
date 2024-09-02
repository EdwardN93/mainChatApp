const mongoose = require('mongoose');
const date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();

if (hours.toString().length < 2) hours = '0' + hours * 1;
if (minutes.toString().length < 2) minutes = '0' + minutes * 1;

let hour = `${hours}:${minutes}`;

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have name'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Text should have some text'],
  },
  createdAt: {
    type: String,
    default: hour,
  },
});

const chatText = mongoose.model('Chat', chatSchema, 'Fulgutsa');

module.exports = chatText;
