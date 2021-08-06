const { validate, Register } = require('../models/authm');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '587279546475-5ocljn07t366rpf942j5ul28o3os2q38.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    console.log(payload);
    return payload;
}

async function login(req, res,next) {
    if(req.body.authToken){
        verify(req.body.authToken).then(async (user) => {
            const userExist = await Register.findOne({ email: user .email })
            if (userExist) {
                return res.status(400).send({error:true,errorMessage:'User already Registered'});
            }
            let newUser = new Register({
                email:user.email,
            });
            await newUser.save();
            const token = jwt.sign({ _id: newUser._id }, 'jwtPrivateKey');
            res.header('x-auth-token', token).send({error:false,message:`${newUser.email}  has been Verified Succesfully`});
        }).catch(err=>{
            next(err);
        })
    }else {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({error:true,message:error.details[0].message});
        }
        const user = await Register.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({error:true,errorMessage:'Invalid Email'});
        }
        const password = await bcrypt.compare(req.body.password, user.password)
        if (!password) {
            return res.status(400).send({error:true,errorMessage:'Invalid Password'});
        }
        const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
        res.header('x-auth-token', token).send({error:false,message:`${newUser.email} has been Verified Succesfully`});
    }
}

module.exports.login = login;

