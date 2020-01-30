const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Restaurants = require('./routes/api/Restaurants')

const app = express();

app.use(bodyParser.json());

const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/restaurants',
    port: 8000
  };
  
  //setup database
  mongoose.Promise = global.Promise;
  // MongoDB Connection
  if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!');
        throw error;
      }else console.log('connected to mongodb database!');
    });
  }

// User Routes
app.use('/api/Restaurants', Restaurants);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server started on port ${port}`));