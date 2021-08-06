const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Register, Otp } = require('../models/authm')
const {sendMail} = require('../controllers/mail-controller')
const {reSendMail} = require('../controllers/resend-mail-controller')
const {verifyOtp} = require('../controllers/verify-controller')
const {login} = require('../controllers/login-controller')
const {resetMail} = require('../controllers/password-reset-controller')
const {otpVerify} = require('../controllers/verify-otp-controller')
const {resetPassword} = require('../controllers/reset-password-controller')

router.get('/register',auth, async (req, res) => {
    const user = await Register.find();
    res.send(user);
})

router.get('/getotp', async (req, res) => {
    const otp = await Otp.find();
    res.send(otp);
})

router.post('/register',sendMail)

router.post('/login',login);

router.put('/resendotp',reSendMail)

router.put('/verify',verifyOtp )

router.delete('/users/:id', async (req, res) => {
    const user = await Register.findByIdAndRemove(req.params.id);
    if (!user) {
        return res.status(404).send('The user you have entered does not exist');
    }
    // const user = await User.deleteMany()
    res.send(user);
})
router.delete('/otp/:id', async (req, res) => {
    const user = await Otp.findByIdAndRemove(req.params.id)
    // const user = await Otp.remove()
    res.send(`user deleted successfully ${user}`)
})

const https =  require('https');

router.post('/auth/facebook',(req,res,next) => {
    console.log(req.body.authToken);
    const options = {
        hostname:'graph.facebook.com',
        port:443,
        path:'/me?access_token=' + req.body.authToken,
        method:'GET'
    };
    const request = https.get(options,responce => {
        responce.on('data', function (user){
            user = JSON.parse(user.toString());
            console.log(user);
        })
    })
    request.on('error',(message) => {
        console.log('error from requst');
        console.error(message);
    });
    request.end();
})

router.post('/forgotpassword',resetMail);

router.post('/verifyotpforpassword',otpVerify);

router.put('/resetPassword',resetPassword)

module.exports = router;
