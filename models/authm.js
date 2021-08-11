const Joi = require('joi');
const mongoose = require('mongoose')

const Register = mongoose.model('Register', new mongoose.Schema({
    email: {
        type: String,
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
<<<<<<< HEAD
        defalut:''
    },
    getUpdates: {
        type:Boolean,
        default : false
=======
        default: false
>>>>>>> cfbbef6bfc873250d52c516bf91c7b9bff3501e7
    }
}))

const Otp = mongoose.model('Otp', new mongoose.Schema({
    email: {
        type: String
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
<<<<<<< HEAD
        email: Joi.string().max(30).required().email(),
        password: Joi.string().required(),
        phoneNumber: Joi.number(),
        getUpdates:Joi.boolean()
=======
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(15),
        phoneNumber: Joi.number().required(),
        role:Joi.string().required()
>>>>>>> cfbbef6bfc873250d52c516bf91c7b9bff3501e7
    }
    return Joi.validate(user,schema )
}

module.exports.validate = validateUser;
module.exports.Register = Register;
module.exports.Otp = Otp;