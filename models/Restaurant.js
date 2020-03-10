const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    reviews: {
        type: [Object]
    }
});

module.exports = Restaurant = mongoose.model('Restaurant', RestaurantSchema);

