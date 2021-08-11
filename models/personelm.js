const Joi = require("joi");
const mongoose = require("mongoose");

const Personel = mongoose.model("Personel", new mongoose.Schema({
    Name: {
      type: String,
      maxlength: 30,
      required: true,
    },
    DateofBirth: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Sex: {
      type: String,
      required: true,
    },
    Address: {
      PostalAddress: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      Country: {
        type: String,
        required: true,
      },
      Pincode: {
        type: String,
        required: true,
      },
    },
    Race: {
      type: String,
      required: true,
    },
    Religion: {
      type: String,
      required: true,
    },
    Occupation: {
      Type: {
        type: String,
        required: true,
      },
      Designation: {
        type: String,
        required: true,
      },
      Company: {
        type: String,
        required: true,
      },
      WorkTimings: {
        type: String,
        required: true,
      },
    },
    EducationalStatus: {
      type: String,
      required: true,
    },
    MaritalStatus: {
      type: String,
      required: true,
    },
    Contact: {
      WhatsupExists: {
        type: Boolean,
        required: true,
      },
      WhatsupNotification: {
        type: Boolean,
        required: true,
      },
    },
    EmailAddress: {
      type: String,
      required: true,
    },
    FamilyType: {
      type: String,
      required: true,
    },
    AnnualIncome: {
      type: Number,
      required: true,
    },
    UserId: {
      type: String,
    },
  })
);

function validateDetails(user) {
  const schema = {
    Name: Joi.string().max(30).required(),
    DateofBirth: Joi.string().required(),
    Age: Joi.number().required(),
    Sex: Joi.string().required(),
    Address: {
      PostalAddress: Joi.string().required(),
      City: Joi.string().required(),
      State: Joi.string().required(),
      Country: Joi.string().required(),
      Pincode: Joi.string().required(),
    },
    Race: Joi.string().required(),
    Religion: Joi.string().required(),
    Occupation: {
      Type: Joi.string().required(),
      Designation: Joi.string().required(),
      Company: Joi.string().required(),
      WorkTimings: Joi.string().required(),
    },
    EducationalStatus: Joi.string().required(),
    MaritalStatus: Joi.string().required(),
    Contact: {
      WhatsupExists: Joi.boolean().required(),
      WhatsupNotification: Joi.boolean().required(),
    },
    EmailAddress: Joi.string().required().email(),
    FamilyType: Joi.string().required(),
    AnnualIncome: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}

module.exports.validate = validateDetails;
module.exports.Personel = Personel;
