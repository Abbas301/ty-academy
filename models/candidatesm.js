const Joi = require('joi');
const mongoose = require('mongoose')

const Candidates = mongoose.model('Candidates', new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    yop: {
        type: String,
        required: true
    },
    tenthPercentage:{
        type:String,
        required: true
    },
    twelvePercentage:{
        type:String,
        required: true
    },
    degreeAggregate:{
        type:String,
        required: true
    },
    masterAggregate:{
        type:String,
        required: true
    },
    branch:{
        type:String,
        required: true
    }
}))



function validateCandidate(user) {
    const schema = {
        name: Joi.string().required(),
        contact: Joi.string().required(),
        email: Joi.string().email().required(),
        degree:Joi.string().required(),
        stream:Joi.string().required(),
        yop:Joi.string().required(),
        tenthPercentage:Joi.string().required(),
        twelvePercentage:Joi.string().required(),
        degreeAggregate:Joi.string().required(),
        masterAggregate:Joi.string().required(),
        branch:Joi.string().required(),
    }
    return Joi.validate(user,schema )
}


module.exports.validateCandidate = validateCandidate;
module.exports.Candidates = Candidates;