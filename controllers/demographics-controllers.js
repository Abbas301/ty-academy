const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Register } = require('../models/authm');
const {Validate, Goal, validateDetails} = require('../models/demographicsm');
const { Personal } = require('../models/demographicsm')

async function userDetails(req, res) {
  console.log(req.user._id);
    let id = req.user._id;
    const { error } = validateDetails(req.body);
    if (error) {
      return res.status(400).send({ error: true, errorMessage: error.details[0].message });
    }
    let person = await Register.findOne({_id:id})
    console.log(person);

    const userExist = await Personal.findOne({
      email: req.body.email,  
    });
    if (userExist) {
      return res.status(400).send({ error: true, errorMessage: "User already existed" });
    }
    
  let user = new Personal({
    fullName: req.body.fullName,
    dateofBirth: req.body.dateofBirth,
    age: req.body.age,
    sex: req.body.sex,
    postalAddress: req.body.postalAddress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pincode: req.body.pincode,
    nationality: req.body.nationality,
    currentLivesIn: req.body.currentLivesIn,
    religion: req.body.religion,
    occupation: req.body.occupation,
    designation: req.body.designation,
    company: req.body.company,
    workTimings: req.body.workTimings,
    educationalStatus: req.body.educationalStatus,
    maritalStatus: req.body.maritalStatus,
    deriveRace:req.body.deriveRace,
    familyType: req.body.familyType,
    annualIncome: req.body.annualIncome,
    email : person.email ,
    whatsAppNumber : person.phoneNumber,
    phoneNumber : person.phoneNumber,
    getUpdates : person.getUpdates,
    userId: req.user._id, 
  });
  await user.save();
  res.send({
    error: false,
    user: user,
  });
}

async function updateDetails(req, res, next) {

  let person = await Register.findOne({_id:req.user._id})
  console.log(person);

      let user = await Personal.findByIdAndUpdate(req.params.id,req.body,
    { new: true }
  );
  res.send(user);
}

async function goals(req, res) {
    try {
        const {error} = Validate(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const details = await Goal.findOne({userId:req.user._id})
        if(details){
            return res.status(400).send({error:true , errorMessage:"Goals are already existed. Just update it!!!!"})
        }
        const data =req.body;
        data.userId = req.user._id
        goals = new Goal(data)
        const goals1 = await goals.save()
        res.status(200).send({error:false, message:"Goals are added successfully", response:goals1});
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
        
        const goals = await Goal.findByIdAndUpdate(req.params.id,req.body, {new: true})
        if (! goals) 
            return res.status(404).send('customer is not found by this id')
        
        res.send(goals)
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

module.exports.goals = goals;
module.exports.putGoals = putGoals;
module.exports.userDetails = userDetails;
module.exports.updateDetails = updateDetails;

