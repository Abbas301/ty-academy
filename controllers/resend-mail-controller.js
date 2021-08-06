const { Otp } = require('../models/authm');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');


async function reSendMail(req,res) {
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
        text: `New Otp for your verification ${random}`
    };
    await  mailTransporter.sendMail(mailDetails,async function (err) {
        if (err) {
            res.send({error:true,message:err.detalis[0].message})
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
                next(err);
            }
        }
    })
}

module.exports.reSendMail = reSendMail;