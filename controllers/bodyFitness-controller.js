const {bodyFitnessValidate, BodyFitness} = require('../models/goalsm');

async function bodyFitness(req, res) {
    try {
        const {error} = bodyFitnessValidate(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const userExist = await BodyFitness.findOne(req.params.userId);
        if(userExist){
            return res.status(400).send({error:true,errorMessage:'User already exist!! just update your goals'})
        }
        bodyFitness = new BodyFitness({
            BodyMeasurements: {
                Height: req.body.BodyMeasurements.Height,
                Weight: req.body.BodyMeasurements.Weight,
                ArmCircumference: req.body.BodyMeasurements.ArmCircumference,
                ChestCircumference: req.body.BodyMeasurements.ChestCircumference,
                WaistCircumference: req.body.BodyMeasurements.WaistCircumference,
                HipCircumference: req.body.BodyMeasurements.HipCircumference,
                ThighCircumference: req.body.BodyMeasurements.ThighCircumference,
                CalfCircumference: req.body.BodyMeasurements.CalfCircumference
            },
            BodyComposition: {
                Fat: req.body.BodyComposition.Fat,
                SkeletalMuscle: req.body.BodyComposition.SkeletalMuscle,
                VisceralFat: req.body.BodyComposition.VisceralFat,
                TotalBodyWater: req.body.BodyComposition.TotalBodyWater,
                BodyAge: req.body.BodyComposition.BodyAge
            },
            userId:req.user._id
        })
        const bodyFitness1 = await bodyFitness.save()
        console.log(bodyFitness1);
        res.send(bodyFitness1);
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function putBodyFitness(req, res) {
    try {
        const {error} = bodyFitnessValidate(req.body)
        if (error) 
            return res.status(400).send({error: true, errorMessage: error.details[0].message})
        
        const bodyFitness = await BodyFitness.findByIdAndUpdate(req.params.id, {
            BodyMeasurements: {
                Height: req.body.BodyMeasurements.Height,
                Weight: req.body.BodyMeasurements.Weight,
                ArmCircumference: req.body.BodyMeasurements.ArmCircumference,
                ChestCircumference: req.body.BodyMeasurements.ChestCircumference,
                WaistCircumference: req.body.BodyMeasurements.WaistCircumference,
                HipCircumference: req.body.BodyMeasurements.HipCircumference,
                ThighCircumference: req.body.BodyMeasurements.ThighCircumference,
                CalfCircumference: req.body.BodyMeasurements.CalfCircumference
            },
            BodyComposition: {
                Fat: req.body.BodyComposition.Fat,
                SkeletalMuscle: req.body.BodyComposition.SkeletalMuscle,
                VisceralFat: req.body.BodyComposition.VisceralFat,
                TotalBodyWater: req.body.BodyComposition.TotalBodyWater,
                BodyAge: req.body.BodyComposition.BodyAge
            }
        }, {new: true})
        if (! bodyFitness) 
            return res.status(404).send('customer is not found by this id')
        
        res.send(bodyFitness);
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

exports.bodyFitness = bodyFitness;
exports.putBodyFitness = putBodyFitness;
