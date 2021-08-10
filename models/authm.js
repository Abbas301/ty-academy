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
        default:null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        defalut:''
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

const Fitness = mongoose.model('Fitness', new mongoose.Schema({
    Health:{
        type:String,
        enum:['I want to lose weight.',
              'I want to reverse my medical condition.',
              'I want to sleep better.'],
        required:true
    },
    Fitness:{
        type:String,
        enum:['I want to lose fat and gain muscle.',
              'I want to improve my strength and endurance.',
              'I want to be better at my sport.'],
        required:true
    },
    Personal:{
        type:String,
        enum:['I want to look good.',
              'I want to feel good.',
              'I want to change my habits.'],
        required:true
    },
    userId:{
        type:String
    }
}));

const BodyFitness = mongoose.model('BodyFitness', new mongoose.Schema({
    BodyMeasurements:{
         Height:{
             type:String,
             required:true
         },
         Weight:{
             type:String,
             required:true
         },
         ArmCircumference:{
             type:String,
             required:true
         },
         ChestCircumference:{
             type:String,
             required:true
         },
         WaistCircumference:{
             type:String,
             required:true
         },
         HipCircumference:{
             type:String,
             required:true
         },
         ThighCircumference:{
             type:String,
             required:true
         },
         CalfCircumference:{
             type:String,
             required:true
         }
     },
    BodyComposition:{
         Fat:{
             type:String,
             required:true
         },
         SkeletalMuscle:{
             type:String,
             required:true
         },
         VisceralFat:{
             type:String,
             required:true
         },
         TotalBodyWater:{
             type:String,
             required:true
         },
         BodyAge:{
             type:String,
             required:true
         }
    },
    userId:{
        type:String
    }
 }));
 
function validateUser(user) {
    const schema = {
        email: Joi.string().max(30).required().email(),
        password: Joi.string().required(),
        phoneNumber: Joi.number(),
    }
    return Joi.validate(user,schema )
}

function goalsValidate(goal){
    const schema = {
        Health   : Joi.required(),
        Fitness  : Joi.required(),
        Personal : Joi.required()
    }
    return Joi.validate(goal,schema)
}

function bodyFitnessValidate(bodyFitness){
    const schema = {
        BodyMeasurements:{
            Height: Joi.string().required(),
            Weight: Joi.string().required(),
            ArmCircumference: Joi.string().required(),
            ChestCircumference: Joi.string().required(),
            WaistCircumference: Joi.string().required(),
            HipCircumference: Joi.string().required(),
            ThighCircumference: Joi.string().required(),
            CalfCircumference: Joi.string().required(),
        },
        BodyComposition:{
            Fat:Joi.string().required(),
            SkeletalMuscle:Joi.string().required(),
            VisceralFat:Joi.string().required(),
            TotalBodyWater:Joi.string().required(),
            BodyAge:Joi.string().required(),
        }
    }
    return Joi.validate(bodyFitness,schema)
}

module.exports.validate = validateUser;
module.exports.Register = Register;
module.exports.Otp = Otp;
module.exports.Goals = Fitness;
module.exports.BodyFitness = BodyFitness;
module.exports.Validate = goalsValidate;
module.exports.bodyFitnessValidate = bodyFitnessValidate;