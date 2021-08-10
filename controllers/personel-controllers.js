const { Personel, validate } = require("../models/personelm");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

async function userDetails(req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ error: true, errorMessage: error.details[0].message });
  }
  const userExist = await Personel.findOne({
    EmailAddress: req.body.EmailAddress,  
  });
  if (userExist) {
    return res
      .status(400)
      .send({ error: true, errorMessage: "User already Registered" });
  }

  let user = new Personel({
    Name: req.body.Name,
    DateofBirth: req.body.DateofBirth,
    Age: req.body.Age,
    Sex: req.body.Sex,
    Address: {
      PostalAddress: req.body.Address.PostalAddress,
      City: req.body.Address.City,
      State: req.body.Address.State,
      Country: req.body.Address.Country,
      Pincode: req.body.Address.Pincode,
    },
    Race: req.body.Race,
    Religion: req.body.Religion,
    Occupation: {
      Type: req.body.Occupation.Type,
      Designation: req.body.Occupation.Designation,
      Company: req.body.Occupation.Company,
      WorkTimings: req.body.Occupation.WorkTimings,
    },
    EducationalStatus: req.body.EducationalStatus,
    MaritalStatus: req.body.MaritalStatus,
    Contact: {
      WhatsupExists: req.body.Contact.WhatsupExists,
      WhatsupNotification: req.body.Contact.WhatsupNotification,
    },
    EmailAddress: req.body.EmailAddress,
    FamilyType: req.body.FamilyType,
    AnnualIncome: req.body.AnnualIncome,
    UserId: req.user._id, 
  });
  await user.save();
  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  res.header("x-auth-token", token).send({
    error: false,
    user: user,
  });
}

async function updateDetails(req, res, next) {
  const person = await Personel.findOne({
    EmailAddress: req.body.EmailAddress,
  });
  if (!person) {
    return res
      .status(400)
      .send("This User Does Not Exist in Personel collection");
  }
  const update = await Personel.findByIdAndUpdate(
    person._id,
    {
      Name: req.body.Name,
      DateofBirth: req.body.DateofBirth,
      Age: req.body.Age,
      Sex: req.body.Sex,
      Address: {
        PostalAddress: req.body.Address.PostalAddress,
        City: req.body.Address.City,
        State: req.body.Address.State,
        Country: req.body.Address.Country,
        Pincode: req.body.Address.Pincode,
      },
      Race: req.body.Race,
      Religion: req.body.Religion,
      Occupation: {
        Type: req.body.Occupation.Type,
        Designation: req.body.Occupation.Designation,
        Company: req.body.Occupation.Company,
        WorkTimings: req.body.Occupation.WorkTimings,
      },
      EducationalStatus: req.body.EducationalStatus,
      MaritalStatus: req.body.MaritalStatus,
      Contact: {
        WhatsupExists: req.body.Contact.WhatsupExists,
        WhatsupNotification: req.body.Contact.WhatsupNotification,
      },
      EmailAddress: req.body.EmailAddress,
      FamilyType: req.body.FamilyType,
      AnnualIncome: req.body.AnnualIncome,
    },
    { new: true }
  );
  res.send(update);
}

module.exports.userDetails = userDetails;
module.exports.updateDetails = updateDetails;
