const mongoose = require('mongoose');
const date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();

if (hours.toString().length < 2) hours = '0' + hours * 1;
if (minutes.toString().length < 2) minutes = '0' + minutes * 1;

let hour = `${hours}:${minutes}`;

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter valid Email'],
    trim: true,
  },
  locationName: {
    type: String,
    required: [true, 'Name of your location'],
  },
  description: {
    type: String,
    required: [true, 'Location must have a description'],
  },
  locationAddress: {
    type: String,
    required: [true, 'Entrer an address for location'],
  },
  facilities: {
    type: String,
    // required: [true, 'Enter facilities'],
  },

  price: {
    type: Number,
    required: [true, 'Enter price'],
  },
  createdAt: {
    type: String,
    default: hour,
  },
});

const booker = mongoose.model('Book', bookSchema, 'Book');

module.exports = booker;
