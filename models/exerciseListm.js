const mongoose = require('mongoose');

const ExerciseList = mongoose.model('ExerciseList', new mongoose.Schema({
    exerciseType: {
        type: String
    },
    exerciseName: {
        type: String
    },
    youTubeURL: {
        type: String
    },
    uploadfile : {
        type:String
    }
}));

module.exports.ExerciseList = ExerciseList;

