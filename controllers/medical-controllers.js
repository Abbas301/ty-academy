const { MedicalHistory } = require("../models/medicalm");
const _ = require("lodash");
const multer = require("multer");
const fs = require('fs');

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/pdf":"pdf"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = "Invalid mimetype";
        if (isValid) {
            error = null;
        }
        cb(error, "public/medical-history");
    },
    filename: async (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
}); 

async function addMedicalDetails(req,res,next) {
    const images = req.files; 
    // let user;
    // if(req.body.currentSymptoms){
    //     user.currentSymptoms = req.body.currentSymptoms
    // }
    // if(req.body.currentMedicalHistory){

    // }
    try {
        let user = new MedicalHistory({
            currentSymptoms:req.body.currentSymptoms,
            currentMedicalHistory:{
                diagnosis:req.body.cmhDiagnosis,
                diagnosisDate:req.body.cmhDiagnosisDate,
                treatment:req.body.cmhtreatment,
                prescription:images.cmhPrescription[0].path,
                investigationReport:images.cmhIR[0].path
            },
            allergies:{
                 dust:req.body.dustAllergie,
                 pollen:req.body.pollenAllergie,
                 medication:req.body.medicationAllergie,
                 food:req.body.allergieFood,
                 other:req.body.otherAllergies
             },
             pastMedicalHistory:{
                 diagnosis:req.body.pmhDiagnosis,
                 diagnosisDate:req.body.pmhDiagnosisDate,
                 treatment:req.body.pmhtreatment,
                 status:req.body.pmhstatus,
                 prescription:images.pmhIR[0].path,
                 investigationReport:images.pmhIR[0].path
             },
             previousSurgeries: {
                 diagnosis:req.body.psDiagnosis,
                 diagnosisDate:req.body.psDiagnosisDate,
                 status:req.body.psstatus,
                 prescription:images.psPrescription[0].path,
                 investigationReport:images.psIR[0].path
             },
             previousTreatment: {
                 diagnosis:req.body.ptDiagnosis,
                 diagnosisDate:req.body.ptDiagnosisDate,
                 treatment:req.body.pttreatment,
                 status:req.body.ptstatus,
                 prescription:images.ptPrescription[0].path,
                 investigationReport:images.ptIR[0].path
             },
             FamilyMedicalHistory: {
                 diagnosis:req.body.fmhDiagnosis,
                 diagnosisDate:req.body.fmhDiagnosisDate,
                 relationship:req.body.fmhRel,
                 status:req.body.fmhStatus
             },
             menustrualHistory:{
                 menarche:req.body.menarche,
                 lmp:req.body.lmp,
                 Frequency:req.body.Frequency,
                 duration:req.body.duration,
                 flow:req.body.flow,
                 cramps:req.body.cramps,
                 menopause:req.body.menopause
             },
             childBirthHistory:{
                 ageofChild:req.body.ageofChild,
                 sexofChild:req.body.sexofChild,
                 modeOfDelivery:req.body.modeOfDelivery,
                 complications:req.body.complications,
                 abortions:{
                     count:req.body.abortionCount,
                     longestDuration:req.body.longestDuration,
                     modeOfTermination:req.body.modeOfTermination
                 }
             },
             recentInvestigation:images.recentIR[0].path
           });
        const result = await user.save();
        res.send({error:false,user:result,message:'User Data Saved Sucessfully'})
    } catch(err) {
        console.error(err);
        next(err);
    }
}
 
async function updateMedicalDetails(req,res,next) {
    // console.log(req.body);
    const images = req.files; 
    try{
        const detailsExist = await MedicalHistory.findOne({userId:req.body.userId});
          if (!detailsExist) {
            return res.status(400).send({ error: true, errorMessage: "Specified User Does not exist" });
          }
          let user = {
            currentSymptoms:req.body.currentSymptoms,
            currentMedicalHistory:{
                diagnosis:req.body.cmhDiagnosis,
                diagnosisDate:req.body.cmhDiagnosisDate,
                treatment:req.body.cmhtreatment,
                prescription:images.cmhPrescription[0].path,
                investigationReport:images.cmhIR[0].path
            },
            allergies:{
                 dust:req.body.dustAllergie,
                 pollen:req.body.pollenAllergie,
                 medication:req.body.medicationAllergie,
                 food:req.body.allergieFood,
                 other:req.body.otherAllergies
             },
             pastMedicalHistory:{
                 diagnosis:req.body.pmhDiagnosis,
                 diagnosisDate:req.body.pmhDiagnosisDate,
                 treatment:req.body.pmhtreatment,
                 status:req.body.pmhstatus,
                 prescription:images.pmhIR[0].path,
                 investigationReport:images.pmhIR[0].path
             },
             previousSurgeries: {
                 diagnosis:req.body.psDiagnosis,
                 diagnosisDate:req.body.psDiagnosisDate,
                 status:req.body.psstatus,
                 prescription:images.psPrescription[0].path,
                 investigationReport:images.psIR[0].path
             },
             previousTreatment: {
                 diagnosis:req.body.ptDiagnosis,
                 diagnosisDate:req.body.ptDiagnosisDate,
                 treatment:req.body.pttreatment,
                 status:req.body.ptstatus,
                 prescription:images.ptPrescription[0].path,
                 investigationReport:images.ptIR[0].path
             },
             FamilyMedicalHistory: {
                 diagnosis:req.body.fmhDiagnosis,
                 diagnosisDate:req.body.fmhDiagnosisDate,
                 relationship:req.body.fmhRel,
                 status:req.body.fmhStatus
             },
             menustrualHistory:{
                 menarche:req.body.menarche,
                 lmp:req.body.lmp,
                 Frequency:req.body.Frequency,
                 duration:req.body.duration,
                 flow:req.body.flow,
                 cramps:req.body.cramps,
                 menopause:req.body.menopause
             },
             childBirthHistory:{
                 ageofChild:req.body.ageofChild,
                 sexofChild:req.body.sexofChild,
                 modeOfDelivery:req.body.modeOfDelivery,
                 complications:req.body.complications,
                 abortions:{
                     count:req.body.abortionCount,
                     longestDuration:req.body.longestDuration,
                     modeOfTermination:req.body.modeOfTermination
                 }
             },
             recentInvestigation:images.recentIR[0].path,
             userId:req.user._id
           };
        const result = await MedicalHistory.findByIdAndUpdate(detailsExist._id,user,{new:true}); 
        res.send({error:false,message:'User Data Updated Sucessfully',result:result})
    } catch(err) {
        console.error(err);
        next(err);
    }
}

module.exports.addMedicalDetails = addMedicalDetails;
module.exports.updateMedicalDetails = updateMedicalDetails;
module.exports.storage = storage;