const { Register,Otp } = require('../models/authm')
const jwt = require('jsonwebtoken')

async function verifyOtp(req, res,next) {
    const user = await Otp.findOne({ email: req.body.email });
    const recivedOtp = req.body.emailOtp;
    if (!user) {
        return res.status(400).send('This User Does Not Exist in otp collection');
    }
    try {
        const dbOtp = jwt.verify(user.emailOtp, 'jwtPrivateKey');
        if (dbOtp.emailOtp === recivedOtp) {
            const userNew = await Register.findOne({ email: user.email });
            await Register.findByIdAndUpdate(userNew._id, {
                email: userNew.email,
                phoneNumber: userNew.phoneNumber,
                password: userNew.password,
                isEmailVerified: true,
                isPhoneVerified: false
            },{ new: true })
            res.status(200).send({error:false,message:'User Successfully Verified'})
        } else {
            res.status(400).send({error:true,message:'Invalid OTP'})
        }
    } catch (err) {
        next(err);
    }
}
module.exports.verifyOtp = verifyOtp;
