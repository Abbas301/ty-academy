const Joi = require('joi');
const mongoose = require('mongoose')

const Calendarlist = mongoose.model('Calendarlist', new mongoose.Schema({
    batchName: {
        type: String ,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}))



function validateCalendar(calendar) {
    const schema = {
        batchName: Joi.string().required(),
        technology: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate:Joi.date().required(),
        status:Joi.string().required()
    }
    return Joi.validate(calendar,schema )
}


module.exports.validateCalendar = validateCalendar;
module.exports.Calendarlist = Calendarlist;