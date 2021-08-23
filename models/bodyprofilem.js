const mongoose = require('mongoose');
const Joi = require('joi');

const Image = mongoose.model('Image', new mongoose.Schema({
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
}));

const BodyFitness = mongoose.model('BodyFitness', new mongoose.Schema({
    bodyMeasurements:{
         height:{
             type:String,
             required:true
         },
         weight:{
             type:String,
             required:true
         },
         armCircumference:{
             type:String,
             required:true
         },
         chestCircumference:{
             type:String,
             required:true
         },
         waistCircumference:{
             type:String,
             required:true
         },
         hipCircumference:{
             type:String,
             required:true
         },
         thighCircumference:{
             type:String,
             required:true
         },
         calfCircumference:{
             type:String,
             required:true
         }
     },
    bodyComposition:{
         fat:{
             type:String,
             required:true
         },
         skeletalMuscle:{
             type:String,
             required:true
         },
         visceralFat:{
             type:String,
             required:true
         },
         totalBodyWater:{
             type:String,
             required:true
         },
         bodyAge:{
             type:String,
             required:true
         }
    },
    userId:{
        type:String
    }
 }));

 function bodyFitnessValidate(bodyFitness){
    const schema = {
        bodyMeasurements:{
            height: Joi.string().required(),
            weight: Joi.string().required(),
            armCircumference: Joi.string().required(),
            chestCircumference: Joi.string().required(),
            waistCircumference: Joi.string().required(),
            hipCircumference: Joi.string().required(),
            thighCircumference: Joi.string().required(),
            calfCircumference: Joi.string().required(),
        },
        bodyComposition:{
            fat:Joi.string().required(),
            skeletalMuscle:Joi.string().required(),
            visceralFat:Joi.string().required(),
            totalBodyWater:Joi.string().required(),
            bodyAge:Joi.string().required(),
        }
    }
    return Joi.validate(bodyFitness,schema)
}

module.exports.Image = Image;
module.exports.BodyFitness = BodyFitness;
module.exports.bodyFitnessValidate = bodyFitnessValidate;