const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    empId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}))



function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        empId: Joi.string().required(),
        image: Joi.string().required()
    }
    return Joi.validate(user,schema )
}


module.exports.validateUser = validateUser;
module.exports.User = User;