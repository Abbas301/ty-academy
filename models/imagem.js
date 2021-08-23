const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({

    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }


});

module.exports = mongoose.model('image', imageSchema)
