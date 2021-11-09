const Joi = require('joi');
const mongoose = require('mongoose')

const Batches = mongoose.model('Batches', new mongoose.Schema({
    batchName: {
        type: String ,
        required: true
    },
    client: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    mentors: {
        type: Array,
        required: true
    },
    trainers: {
        type: Array,
        required: true
    },
    progress:{
        type:String,
        required: true
    }
}))



function validate(batch) {
    const schema = {
        batchName: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        mentors:Joi.array().required(),
        trainers:Joi.array().required(),
        progress:Joi.string().required()
    }
    return Joi.validate(batch,schema )
}


module.exports.validate = validate;
module.exports.Batches = Batches;