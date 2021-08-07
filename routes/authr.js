const express = require('express');
const router = express.Router();
const https =  require('https');
const auth = require('../middlewares/auth');
const { Register, Otp } = require('../models/authm')
const {reSendMail,resetMail,sendMail} = require('../controllers/mail-controllers')
const {login} = require('../controllers/login-controller')
const {otpVerify,verifyOtp} = require('../controllers/otp-verify-controllers')
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

router.post('/forgotpassword',resetMail);

router.post('/verifyotpforpassword',otpVerify);

router.put('/resetPassword',resetPassword)

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

module.exports = router;
