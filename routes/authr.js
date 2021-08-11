const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Register, Otp } = require('../models/authm')
const {reSendMail,resetMail,sendMail} = require('../controllers/mail-controllers')
const {login} = require('../controllers/login-controller')
const {resetOtpVerify,verifyOtp} = require('../controllers/otp-verify-controllers')
const {resetPassword} = require('../controllers/reset-password-controller')
const { Personel } = require('../models/personelm')
const {userDetails,updateDetails} = require('../controllers/personel-controllers')
const {goals, putGoals} = require('../controllers/goals-controller')
const {bodyFitness, putBodyFitness} = require('../controllers/bodyFitness-controller')
const {Goals, BodyFitness} = require('../models/goalsm')


router.get('/register',auth, async (req, res) => { 
    const user = await Register.find();
    res.send(user);
})

router.get('/getotp',auth, async (req, res) => {
    const otp = await Otp.find();
    res.send(otp);
})

router.get('/details',auth, async (req, res) => {
    const persons = await Personel.find();
    res.send(persons);
})

router.get('/goals',auth, async (req, res) => {
    const goals = await Goals.find();
    res.send(goals);
})
router.get('/bodyFitness',auth, async (req, res) => {
    const bodyFitness = await BodyFitness.find();
    res.send(bodyFitness);
})

router.post('/goals',auth, goals)
router.put('/putGoals/:id',auth, putGoals)
router.post('/bodyFitness',auth, bodyFitness)
router.put('/putBodyFitness/:id',auth, putBodyFitness)

router.post('/register',sendMail)

router.post('/login',login);

router.put('/resendotp',reSendMail)

router.put('/verify',verifyOtp )

router.post('/details',userDetails)

router.put('/details/:id',auth,updateDetails)

router.delete('/users/:id',auth, async (req, res) => {
    const user = await Register.findByIdAndRemove(req.params.id);
    if (!user) {
        return res.status(404).send('The user you have entered does not exist');
    }
    // const user = await User.deleteMany()
    res.send(user);
})
router.delete('/otp/:id',auth, async (req, res) => {
    const user = await Otp.findByIdAndRemove(req.params.id)
    // const user = await Otp.remove()
    res.send(`user deleted successfully ${user}`)
})

router.delete('/details/:id',auth, async (req, res) => {
    const user = await Personel.findByIdAndRemove(req.params.id);
    if (!user) {
        return res.status(404).send('The user you have entered does not exist');
    }
    res.send(user);
})

router.post('/forgotpassword',resetMail);

router.post('/verifyotpforpassword',resetOtpVerify);

router.put('/resetPassword',resetPassword);

module.exports = router;
