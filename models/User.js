const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = Users = mongoose.model('user', UserSchema);
// module.exports = Review = mongoose.model('Review', ReviewSchema)
