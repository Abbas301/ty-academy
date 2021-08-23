const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Register } = require("../models/authm");
const { Validate, Goal, validateDetails } = require("../models/demographicsm");
const { Personal } = require("../models/demographicsm");

async function userDetails(req, res) {
  let id = req.user._id;
  const { error } = validateDetails(req.body);
  if (error) {
    return res.status(400).send({ error: true, errorMessage: error.details[0].message });
  }
  let person = await Register.findOne({ _id: id });

  const personalInfo = req.body;
  personalInfo.email = person.email;
  personalInfo.whatsAppNumber = person.phoneNumber;
  personalInfo.phoneNumber = person.phoneNumber;
  personalInfo.getUpdates = person.getUpdates;
  personalInfo.userId = req.user._id;

  const userExist = await Personal.findOne({
    userId: req.user._id,
  });
  if (userExist) {
    return res.status(400).send({error: true,errorMessage: "Personel information already added with this userIdv just update the personalInfo"});
  }
 
  let user = new Personal(personalInfo);
  await user.save();
  res.send({
    error: false,
    user: user,
  });
}

async function updateDetails(req, res, next) {
  let person = await Register.findOne({ _id: req.user._id });
  let user = await Personal.findByIdAndUpdate(req.params.id,req.body,{ new: true });
  if (!user) {
    return res.status(404).send("user is not found by this id");
  }
  res.send({
    error: false,
    message: "user details updated successfully",
    user: user,
  });
}

async function goals(req, res) {
  try {
    const { error } = Validate(req.body);
    if (error) {
      return res.status(400).send({ error: true, errorMessage: error.details[0].message });
    }
    const goalExist = await Goal.findOne({
      userId: req.user._id,
    });
    if (goalExist) {
      return res.status(400).send({
          error: true,
          errorMessage: "Goals already added with this userId just update the goals",
        });
    }

    goalsInfo = req.body;
    goalsInfo.userId = req.user._id;
    goals = new Goal(goalsInfo);
    const goals1 = await goals.save();
    res.send(goals1);
  } catch (err) {
    console.log("error occured");
  }
}

async function putGoals(req, res) {
  try {
    const { error } = Validate(req.body);
    if (error){
      return res.status(400).send({ error: true, errorMessage: error.details[0].message });
    }
    const goals = await Goal.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    if (!goals) {
      return res.status(404).send("customer is not found by this id");
    }
    res.send(goals);
  } catch (err) {
    console.log("error occured");
  }
}

module.exports.goals = goals;
module.exports.putGoals = putGoals;
module.exports.userDetails = userDetails;
module.exports.updateDetails = updateDetails;
