const Joi = require('joi');
const mongoose = require('mongoose')

const Register = mongoose.model('Register', new mongoose.Schema({
    email: {
        type: String,
        maxlength: 30,
        required: true
    },
    password: {
        type: String,
        default:''
    },
    phoneNumber: {
        type: Number,
        default:""
    },
    isEmailVerified: {
        type: Boolean,
        default:false
    },
    isPhoneVerified: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        defalut:''
    },
    getUpdates: {
        type:Boolean,
        default : false
    }
}))

const Otp = mongoose.model('Otp', new mongoose.Schema({
    email: {
        type: String,
        maxlength: 30
    },
    phoneNumber: {
        type: Number
    },
    emailOtp: {
        type: String
    },
    phoneNumberOtp: {
        type: String
    }
}))



function validateUser(user) {
    const schema = {
        email: Joi.string().max(30).required().email(),
        password: Joi.string().required(),
        phoneNumber: Joi.number(),
        getUpdates:Joi.boolean()
    }
    return Joi.validate(user,schema )
}

module.exports.validate = validateUser;
module.exports.Register = Register;
module.exports.Otp = Otp;