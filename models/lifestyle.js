const Joi = require('joi');
const mongoose = require('mongoose');

const Lifestyle = mongoose.model('Lifestyle', new mongoose.Schema({
    physicalActivity : {
        currentPALevel: {
            type : String
        },
        activities : {
            activityName : {
                type : String
            },
            frequency : {
                type : Number
            },
            intensity : {
                type : String
            },
            duration : {
                type : Date
            }
        },
        modesOfPA : {
            type : String
        },
        limitsFromPA : {
            type : String
        },
        preferredTimeForPA : {
            type : Date
        }
    },
    sleep : {
        wakeUpTime : {
            type : Date
        },
        sleepIssues : {
            type : String
        },
        wakeUpMood : {
            type : String
        },
        sleepMedication : {
            type : String
        },
        sleepTime : {
            type : Date
        },
        sleepDuration : {
            type : Number
        },
        snore : {
            type : String //string or boolean
        },
        sleepDevice : {
            type : String //string or boolean
        }
    },
    stress : {
        stressed : {
            type : Boolean
        },
        stressRate : {
            type : Number
        },
        sourceOfStress : {
            type : String
        },
        copeWithStress : {
            type : String
        }
    },
    alcohol : {
        consumeAlcohol : {
            type : Boolean
        },
        alcoholQuantity : {
            type : Number
        },
        alcoholConsumeFrequency : {
            type : String
        },
        alcoholConsumingSince : {
            type : String
        },
        consumeTobacco : {
            type : Boolean
        },
        consumingWay : {
            type :  String
        },
        tobaccoQuantity : {
            type : Number
        },
        tobaccoConsumeFrequency : {
            type : String
        },
        tobaccoConsumingSince : {
            type : String
        }
    },
    drugs : {
        drugsIntake : {
            type : Boolean
        },
        substance : {
            type : String
        },
        quantity : {
            type : Number
        },
        frequency : {
            type : String
        },
        duration : {
            type : Number
        }
    }
    
}))

module.exports.Lifestyle = Lifestyle;