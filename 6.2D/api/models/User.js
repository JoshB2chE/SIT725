const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  studentId: {
    type: String,
    required: [true, 'Please provide a student ID']
  },
});

module.exports = mongoose.model('User', userSchema);;