const {Lifestyle} = require('../models/lifestyle');

async function addLifestyle(req, res, next){
   // const userLc = await Lifestyle.findOne({userId:userId});
   // if (userLc) {
   //    return res.status(400).send({error:true,message:'This Data For This User Already Exists'});
   // }
   // console.log(req.body);
   let lifestyle = new Lifestyle(req.body);
   await lifestyle.save();
   res.status(200).send({error:false, message:'User Data Saved Successfully'});
} 

async function updateLifestyle(req,res,next){
      console.log(req.body);
      try{
          const detailsExist = await Lifestyle.findOne({userId:req.body.userId});
            if (!detailsExist) {
              return res.status(400).send({ error: true, errorMessage: "Specified User Does not exist" });
            }
          const result = await Lifestyle.findByIdAndUpdate(detailsExist._id,req.body,{new:true}); 
          res.send({error:false,message:'User Data Updated Sucessfully'})
      } catch(err) {
          console.error(err);
          next(err);
      }
}

module.exports.addLifestyle = addLifestyle;
module.exports.updateLifestyle = updateLifestyle;
