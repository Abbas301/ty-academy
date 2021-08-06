const { Register,Otp } = require('../models/authm');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const _ = require('lodash');

async function resetMail(req,res,next) {
    const userExist = await Register.findOne({ email: req.body.email })
    if (!userExist) {
        return res.status(400).send({error:true,errorMessage:'InValid Email-Id'});
    }
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dudekulaabbas16@gmail.com',
            pass: 'Abbas@301'
        }
    });
    let random = Math.floor(100000 + Math.random() * 900000);
    let mailDetails = {
        from: 'dudekulaabbas16@gmail.com',
        to: req.body.email,
        subject: 'OTP Form MediFit',
        text: `Otp To Reset Your Password  ${random}`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            res.send({error:true,message:err.detalis[0].message})
        }else {
            try {
                const otpToken = jwt.sign({ emailOtp: random }, 'jwtPrivateKey', { expiresIn: '300s' });
                const otp = new Otp({
                    email: req.body.email,
                    emailOtp: otpToken
                });
                await otp.save();
                res.send({error:false,message:`OTP has Been Successfully Sent To ${req.body.email}`})
            }catch(err) {
                next(err);
            }
        }
    })
}

module.exports.resetMail = resetMail;