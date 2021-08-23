const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseListSchema = new Schema({

    exerciseType: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    youTubeURL: {
        type: String,
        required: true
    },
    uploadfile:{
        type:String
    },
    userId: {
        type: String
    }


});

module.exports = mongoose.model('exerciseList', exerciseListSchema)
