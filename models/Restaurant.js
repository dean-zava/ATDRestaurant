const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const ReviewSchema = new Schema ({
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     BathroomQuality: {
//         type: Number,
//         default: 3
//     },
//     StaffKindness: {
//         type: Number,
//         default: 3
//     },
//     Cleanliness: {
//         type: Number,
//         default: 3
//     },
//     Drive_thru: {
//         type: Number,
//         default: 0
//     },
//     Delivery_Speed: {
//         type: Number,
//         default: 0
//     },
//     FoodQuality: {
//         type: Number,
//         default: 3
//     }
// });

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
        type: [Object],
        default: 0
    }
});

module.exports = Restaurant = mongoose.model('Restaurant', RestaurantSchema);
// module.exports = Review = mongoose.model('Review', ReviewSchema)
