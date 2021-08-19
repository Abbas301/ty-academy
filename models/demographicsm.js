const Joi = require("joi");
const mongoose = require("mongoose");

const Personal = mongoose.model("Personal",new mongoose.Schema({
    fullName: {
      type: String,
      maxlength: 30,
      required: true,
    },
    dateofBirth: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: Boolean,
      required: true,
    },
    postalAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    currentLivesIn: {
      type: Boolean,
      required: true,
    },
    deriveRace:{
      type: String,
      required:true
    },
    religion: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    workTimings: {
      type: String,
      required: true,
    },
    educationalStatus: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    familyType: {
      type: String,
      required: true,
    },
    whatsAppNumber: {
      type: String,
    },
    getUpdates: {
      type: Boolean,
    },
    annualIncome: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
    },
  })
);

const Goal = mongoose.model('Goal', new mongoose.Schema({
  health:{
      type:String,
      enum:['I want to lose weight',
            'I want to reverse my medical condition',
            'I want to sleep better'],
      required:true
  },
  fitness:{
      type:String,
      enum:['I want to lose fat and gain muscle',
            'I want to improve my strength and endurance',
            'I want to be better at my sport'],
      required:true
  },
  personal:{
      type:String,
      enum:['I want to look good',
            'I want to feel good',
            'I want to change my habits'],
      required:true
  },
  userId:{
      type:String
  }
}));

function validateDetails(user) {
  const schema = {
    fullName: Joi.string().max(30).required(),
    dateofBirth: Joi.string().required(),
    age: Joi.string().required(),
    sex: Joi.boolean().required(),
    postalAddress: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.string().required(),
    nationality: Joi.string().required(),
    currentLivesIn: Joi.boolean().required(),
    religion: Joi.string().required(),
    occupation: Joi.string().required(),
    designation: Joi.string().required(),
    company: Joi.string().required(),
    workTimings: Joi.string().required(),
    educationalStatus: Joi.string().required(),
    deriveRace: Joi.string().required(),
    maritalStatus: Joi.string().required(),
    familyType: Joi.string().required(),
    annualIncome: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

function goalsValidate(goal){
    const schema = {
        health   : Joi.required(),
        fitness  : Joi.required(),
        personal : Joi.required()
    }
    return Joi.validate(goal,schema)
}

module.exports.Personal = Personal;
module.exports.Goal = Goal;
module.exports.validateDetails = validateDetails;
module.exports.Validate = goalsValidate;
