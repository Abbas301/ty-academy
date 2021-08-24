const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Register, Otp } = require('../models/authm');
const {reSendMail,resetMail,sendMail} = require('../controllers/mail-controllers');
const {login} = require('../controllers/login-controller');
const {resetOtpVerify,verifyOtp} = require('../controllers/otp-verify-controllers');
const {resetPassword} = require('../controllers/reset-password-controller');
const {addDoctors,updateDoctors} =require('../controllers/add-doc-controller');


router.get('/register',auth, async (req, res) => { 
    const user = await Register.find();
    res.send(user);
})

router.get('/getotp',auth, async (req, res) => {
    const otp = await Otp.find();
    res.send(otp);
})

router.post('/register',sendMail)

/**
 * @swagger
 * definitions:
 *  login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: user Email ID
 *     example: 'harshagl@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '1234567890'
 */

/**
 * @swagger
 *  /login:
 *    post:
 *     summary: user register
 *     description: register
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/login'
 *     responses: 
 *      200:
 *       description : user registration successful
 *      500:
 *       description : user registration fail
 */

router.post('/login',login);


router.put('/resendotp',reSendMail)
router.put('/verify',verifyOtp )

router.delete('/users/:id',auth, async (req, res) => {
    const user = await Register.findByIdAndRemove(req.params.id);
    if (!user) {
        return res.status(404).send('The user you have entered does not exist');
    }
    res.send(user);
})

router.delete('/otp/:id',auth, async (req, res) => {
    const user = await Otp.findByIdAndRemove(req.params.id)
    res.send(`user deleted successfully ${user}`)
})

router.post('/forgotpassword',resetMail);
router.post('/verifyotpforpassword',resetOtpVerify);
router.put('/resetPassword',resetPassword);

router.delete('/deletedoctors/:id', async (req, res) => {
    const user = await Register.findByIdAndRemove(req.params.id)
    res.status(200).send({error:false,message:`${user.email} has been deleted sucessfully`});
})

router.get('/getdoctors', async (req, res) => { 
    const user = await Register.find({role:{$ne:'Client'}});
    res.send(user);
})

router.post('/adddoctors',addDoctors);

router.put('/updatedoctors',updateDoctors);


module.exports = router;
