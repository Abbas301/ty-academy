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
        return res.status(400).send({error:true,errorMessage:'This User is already Registered'});
    }
    let user = new Register(_.pick(req.body, ['email', 'password', 'phoneNumber','getUpdates']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmedifit@gmail.com',
            pass: 'medifittest123'
        }
    });
    let random = Math.floor(100000 + Math.random() * 900000);
    let mailDetails = {
        from: 'testmedifit@gmail.com',
        to: req.body.email,
        subject: 'OTP For MediFit Login',
        html : `<b>Hello, <strong>${user.email}</strong><br><br><br>
        You are successfully registered for Medifit Application<br><br>
        Your Login Credentials:<br><br>
        <strong>Email-Id : ${user.email}</strong><br>
        <strong>password :${req.body.password }</strong><br><br>
        Otp for your verification ${random}`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            try{
                const userExist = await Register.findOne({ email: req.body.email })
                if (userExist) {
                    await Register.findByIdAndRemove(userExist._id);
                }
            }catch (err){
                next(err);
            }
             next(err);
        }else {
            try {
                const otpToken = jwt.sign({ emailOtp: random }, 'jwtPrivateKey', { expiresIn: '600s' });
                const otp = new Otp({
                    email: req.body.email,
                    phoneNumber: '',
                    emailOtp: otpToken
                });
                await otp.save();
                const user = await Register.findOne({email:req.body.email})
                if(user) {
                    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
                    res.header('x-auth-token', token).send({error:false,message:'User Registered sucessfully and email has been sent to user'});
                }
            }catch(err) {
                try{
                    const userExist = await Register.findOne({ email: req.body.email })
                    if (userExist) {
                        await Register.findByIdAndRemove(userExist._id);
                    }
                }catch (err){
                    next(err);
                }
                next(err);
            }
        }
    })
}

async function resetMail(req,res,next) {
    const userExist = await Register.findOne({ email: req.body.email })
    if (!userExist) {
        return res.status(400).send({error:true,errorMessage:'InValid Email-Id'});
    }
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmedifit@gmail.com',
            pass: 'medifittest123'
        }
    });
    let random = Math.floor(100000 + Math.random() * 900000);
    let mailDetails = {
        from: 'testmedifit@gmail.com',
        to: req.body.email,
        subject: 'OTP Form MediFit',
        html : `<b>Hello, <strong>${user.email}</strong><br><br>
        <p>OTP To reset your password <strong>${random}</strong></p>`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            try{
                const userExist = await Register.findOne({ email: req.body.email })
                if (userExist) {
                    await Register.findByIdAndRemove(userExist._id);
                }
            }catch (err){
                next(err);
            }
             next(err);
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
                try{
                    const userExist = await Register.findOne({ email: req.body.email })
                    if (userExist) {
                        await Register.findByIdAndRemove(userExist._id);
                    }
                }catch (err){
                    next(err);
                }
                next(err);
            }
        }
    })
}

async function reSendMail(req,res,next) {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmedifit@gmail.com',
            pass: 'medifittest123'
        }
    });
    let random = Math.floor(100000 + Math.random() * 900000);
    let mailDetails = {
        from: 'testmedifit@gmail.com',
        to: req.body.email,
        subject: 'OTP For MediFit Login',
        text: `New Otp for your verification ${random}`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            try{
                const userExist = await Register.findOne({ email: req.body.email })
                if (userExist) {
                    await Register.findByIdAndRemove(userExist._id);
                }
            }catch (err){
                next(err);
            }
             next(err);
        }else {
            try {
                let otpExists = await Otp.findOne({ email: req.body.email })
                if (otpExists) {
                    const otpToken = jwt.sign({ emailOtp: random }, 'jwtPrivateKey', { expiresIn: '300s' });
                    await Otp.findByIdAndUpdate(otpExists._id, {
                        emailOtp: otpToken,
                        email: otpExists.email
                    }, { new: true });
                    res.status(200).send({error:false,message:"New OTP has been sent Succesfully"})
                }
            }catch(err) {
                try{
                    const userExist = await Register.findOne({ email: req.body.email })
                    if (userExist) {
                        await Register.findByIdAndRemove(userExist._id);
                    }
                }catch (err){
                    next(err);
                }
                next(err);
            }
        }
    })
}




module.exports.reSendMail = reSendMail;

module.exports.resetMail = resetMail;

module.exports.sendMail = sendMail;