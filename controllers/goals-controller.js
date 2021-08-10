const {Validate, Goals} = require('../models/goalsm');
const _ = require('lodash');

async function goals(req, res) {
    try {
        const {error} = Validate(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const userExist = await Goals.findOne(req.params.userId);
        if(userExist){
            return res.status(400).send({error:true,errorMessage:'User already exist!! just update your goals'})
        }
        goals = new Goals({
            Health:req.body.Health,
            Fitness:req.body.Fitness,
            Personal:req.body.Personal,
            userId:req.user._id
        })
        const goals1 = await goals.save()
        console.log(goals1);
        res.send(goals1);
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function putGoals(req, res) {
    try {
        const {error} = Validate(req.body)
        if (error) 
            return res.status(400).send({error: true, errorMessage: error.details[0].message})
        
        const goals = await Goals.findByIdAndUpdate(req.params.id, {
            Health: req.body.Health,
            Fitness: req.body.Fitness,
            Personal: req.body.Personal
        }, {new: true})
        if (! goals) 
            return res.status(404).send('customer is not found by this id')
        
        res.send(goals)
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

exports.goals = goals;
exports.putGoals = putGoals;
