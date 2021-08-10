const { Register } = require('../models/authm');
const bcrypt = require('bcrypt');

async function resetPassword(req,res) {

    const userExist = await Register.findOne({ email: req.body.email })
    if (!userExist) {
        return res.status(404).send({error:true,errorMessage:'User Does not Exists'});
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = await Register.findByIdAndUpdate(userExist._id,{
        password:password
    },{new:true})
    res.status(200).send({error:false,message:'Password Updated successfully'})
}

module.exports.resetPassword = resetPassword;