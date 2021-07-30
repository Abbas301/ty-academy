const { Register,validate,Otp } = require('../models/authm');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const _ = require('lodash');
const bcrypt = require('bcrypt');

async function sendMail(req,res,next) {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({error:true,errorMessage:error.details[0].message});
    }
    const userExist = await Register.findOne({ email: req.body.email })
    if (userExist) {
        return res.status(400).send({error:true,errorMessage:'User already Registered'});
    }
    let user = new Register(_.pick(req.body, ['email', 'password', 'phoneNumber']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

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
        subject: 'OTP For MediFit Login',
        text: `Otp for your verification ${random}`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            res.send({error:true,message:err.detalis[0].message})
        }else {
            try {
                const otpToken = jwt.sign({ emailOtp: random }, 'jwtPrivateKey', { expiresIn: '300s' });
                const otp = new Otp({
                    email: req.body.email,
                    phoneNumber: '',
                    emailOtp: otpToken
                });
                await otp.save();
                const user = await Register.findOne({email:req.body.email})
                if(user) {
                    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
                    res.header('x-auth-token', token).send({error:false,user:_.pick(user, ['_id', 'email', 'phoneNumber'])});
                }

            }catch(err) {
                console.log(err);
            }
        }
    })
}

module.exports.sendMail = sendMail;