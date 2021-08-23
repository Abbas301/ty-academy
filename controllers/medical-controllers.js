const { MedicalHistory } = require("../models/medicalm");
const _ = require("lodash");

async function addMedicalDetails(req,res,next) {
    // const userExist = await MedicalHistory.findOne({userId:req.user._id});
    //   if (userExist) {
    //     return res.status(400).send({ error: true, errorMessage: "You have allready added this info" });
    //   }
    try {
        let user = new MedicalHistory(req.body);
        const result = await user.save();
        res.send({error:false,user:result,message:'User Data Saved Sucessfully'})
    } catch(err) {
        console.error(err);
        next(err);
    }
}


async function updateMedicalDetails(req,res,next) {
    console.log(req.body);
    try{
        const detailsExist = await MedicalHistory.findOne({userId:req.body.userId});
          if (!detailsExist) {
            return res.status(400).send({ error: true, errorMessage: "Specified User Does not exist" });
          }
        const result = await MedicalHistory.findByIdAndUpdate(detailsExist._id,req.body,{new:true}); 
        res.send({error:false,message:'User Data Updated Sucessfully'})
    } catch(err) {
        console.error(err);
        next(err);
    }
}

module.exports.addMedicalDetails = addMedicalDetails;
module.exports.updateMedicalDetails = updateMedicalDetails;