const {Lifestyle} = require('../models/lifestyle');

async function addLifestyle(req, res, next){
   // const userLc = await Lifestyle.findOne({userId:userId});
   // if (userLc) {
   //    return res.status(400).send({error:true,message:'This Data For This User Already Exists'});
   // }
   // console.log(req.body);
   let lifestyle = new Lifestyle({
      physicalActivity : {
         currentPALevel:req.body.physicalActivity.currentPALevel,
         activities : {
             activityName : req.body.physicalActivity.activities.activityName,
             frequency :req.body.physicalActivity.activities.frequency,
             intensity :req.body.physicalActivity.activities.intensity ,
             duration : req.body.physicalActivity.activities.duration
         },
         modesOfPA :req.body.physicalActivity.modesOfPA ,
         limitsFromPA :req.body.physicalActivity.limitsFromPA,
         preferredTimeForPA :req.body.physicalActivity.preferredTimeForPA
     },
     sleep : {
         wakeUpTime : req.body.sleep.wakeUpTime,
         sleepIssues :req.body.sleep.sleepIssues,
         wakeUpMood :req.body.sleep.wakeUpMood ,
         sleepMedication :req.body.sleep.sleepMedication ,
         sleepTime :req.body.sleep.sleepTime ,
         sleepDuration :req.body.sleep.sleepDuration ,
         snore :req.body.sleep.snore,
         sleepDevice :req.body.sleep.sleepDevice
     },
     stress : {
         stressed :req.body.stress.stressed ,
         stressRate :req.body.stress.stressRate ,
         sourceOfStress :req.body.stress.sourceOfStress ,
         copeWithStress :req.body.stress.copeWithStress
     },
     alcohol : {
         consumeAlcohol :req.body.alcohol.consumeAlcohol,
         alcoholQuantity :req.body.alcohol.alcoholQuantity ,
         alcoholConsumeFrequency :req.body.alcohol.alcoholConsumeFrequency ,
         alcoholConsumingSince :req.body.alcohol.alcoholConsumingSince ,
         consumeTobacco :req.body.alcohol.consumeTobacco ,
         consumingWay :req.body.alcohol.consumingWay ,
         tobaccoQuantity :req.body.alcohol.tobaccoQuantity ,
         tobaccoConsumeFrequency :req.body.alcohol.tobaccoConsumeFrequency ,
         tobaccoConsumingSince :req.body.alcohol.tobaccoConsumingSince 
     },
     drugs : {
         drugsIntake :req.body.drugs.drugsIntake ,
         substance :req.body.drugs.substance ,
         quantity :req.body.drugs.quantity ,
         frequency :req.body.drugs.frequency ,
         duration :req.body.drugs.duration
     }
   
   });
   await lifestyle.save();
   res.status(200).send({error:false, message:'User Data Saved Successfully'});
} 

async function updateLifestyle(req,res,next){

}

module.exports.addLifestyle = addLifestyle;
