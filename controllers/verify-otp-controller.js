const { Otp } = require('../models/authm')
const jwt = require('jsonwebtoken')

async function otpVerify(req,res,next) {
    const user = await Otp.findOne({ email: req.body.email });
    const recivedOtp = req.body.emailOtp;
    if (!user) {
        return res.status(400).send({error:true,message:'Entered Email is invalid'});
    }
    try {
        const dbOtp = jwt.verify(user.emailOtp, 'jwtPrivateKey');
        if (dbOtp.emailOtp === recivedOtp) {
            await Otp.findByIdAndDelete(user._id);
            res.status(200).send({error:false,message:'User Successfully Verified'})
        } else {
            res.status(400).send({error:true,message:'Invalid OTP'})
        }
    } catch (err) {
        next(err);
    }
}
module.exports.otpVerify = otpVerify;
