const { Register,Otp } = require('../models/authm')
const jwt = require('jsonwebtoken')

async function verifyOtp(req, res,next) {
    const user = await Otp.findOne({ email: req.body.email });
    const recivedOtp = req.body.emailOtp;
    if (!user) {
        return res.status(400).send({error:true,message:'Invalid User Email-Id'});
    }
    try {
        const dbOtp = jwt.verify(user.emailOtp, 'jwtPrivateKey');
        if (dbOtp.emailOtp === recivedOtp) {
            const userNew = await Register.findOne({ email: user.email });
            await Register.findByIdAndUpdate(userNew._id, {
                isEmailVerified: true,
            },{ new: true })
            await Otp.findByIdAndDelete(user._id);
            res.status(200).send({error:false,newUser:true,message:'User Successfully Verified'})
        } else {
            res.status(400).send({error:true,message:'Invalid OTP'})
        }
    } catch (err) {
        next(err);
    }
}

async function resetOtpVerify(req,res,next) {
    const user = await Otp.findOne({ email: req.body.email });
    const recivedOtp = req.body.emailOtp;
    if (!user) {
        return res.status(400).send({error:true,message:'Entered Email is invalid'});
    }
    try {
        const dbOtp = jwt.verify(user.emailOtp, 'jwtPrivateKey');
        if (dbOtp.emailOtp === recivedOtp) {
            await Otp.findByIdAndDelete(user._id);
            res.status(200).send({error:false,reset:true,message:'User Successfully Verified'})
        } else {
            res.status(400).send({error:true,message:'Invalid OTP'})
        }
    } catch (err) {
        next(err);
    }
}

module.exports.resetOtpVerify = resetOtpVerify;
module.exports.verifyOtp = verifyOtp;