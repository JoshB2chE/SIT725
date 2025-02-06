const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect('mongodb://db:27017/sit725');
    console.log('Connected to the database');
  } 
  
  catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

module.exports = db;