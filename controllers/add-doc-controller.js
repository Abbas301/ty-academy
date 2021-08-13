const { Register,validate,Otp } = require('../models/authm');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

async function addDoctors(req,res,next) {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({error:true,errorMessage:error.details[0].message});
    }
    const userExist = await Register.findOne({ email: req.body.email })
    if (userExist) {
        return res.status(400).send({error:true,errorMessage:'This User is already Registered'});
    }
    let user = new Register(_.pick(req.body, [ 'name','email', 'phoneNumber','role']))
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
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
        You are successfully Added for Medifit Application<br><br>
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
                    res.send({error:false,token:token,message:'Doctor Registered sucessfully and email has been sent'});
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

async function updateDoctors(req,res) {

    const userExist = await Register.findOne({ email: req.body.email })
    if (!userExist) {
        return res.status(404).send({error:true,errorMessage:'User Does not Exists'});
    }
    const user = await Register.findByIdAndUpdate(userExist._id,{
        name:req.body.name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        role:req.body.role
    },{new:true})
    res.status(200).send({error:false,message: `${user.email} Details Updated successfully`})
}


module.exports.addDoctors = addDoctors;

module.exports.updateDoctors = updateDoctors;