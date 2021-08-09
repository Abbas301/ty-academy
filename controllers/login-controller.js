const {validate, Register} = require('../models/authm');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const https = require('https');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '587279546475-5ocljn07t366rpf942j5ul28o3os2q38.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


async function verify(token) {
    const ticket = await client.verifyIdToken({idToken: token, audience: CLIENT_ID});
    const payload = ticket.getPayload();
    return payload;
}

async function login(req, res, next) {
    if (req.body.googleToken) {
        verify(req.body.googleToken).then(async (user) => {
            const userExist = await Register.findOne({email: user.email})
            if (userExist) {
                return res.status(400).send({error: true, errorMessage: 'User already Registered'});
            }
            let newUser = new Register({email: user.email});
            await newUser.save();
            const token = jwt.sign({_id: newUser._id}, 'jwtPrivateKey');
            res.header('x-auth-token', token).send({error: false, message: `${newUser.email}  has been Verified Succesfully`});
        }).catch(err => {
            next(err);
        })
    } else if (req.body.fbToken) {
        const options = {
            hostname: 'graph.facebook.com',
            port: 443,
            path: '/me?fields=id,name,email&access_token=' + req.body.fbToken,
            method: 'GET'
        };
        const request = https.get(options, (responce) => {
            responce.on('data', async function (user) {
                try {
                    parsedUser = JSON.parse(user.toString());
                    if (parsedUser.error) {
                        res.status(400).send({error:true,message:parsedUser.error.message})
                    } else {
                        const userExist = await Register.findOne({email: parsedUser.email})
                        if (userExist) {
                            return res.status(400).send({error: true, errorMessage: 'This Email-Id Already Exists'});
                        }
                        let newUser = new Register({email: parsedUser.email});
                        await newUser.save();
                        const token = jwt.sign({ _id: newUser._id}, 'jwtPrivateKey');
                        res.header('x-auth-token', token).send({error: false, message: `${newUser.email} has been Verified Succesfully`});
                    }
                } catch (err) {
                    next(err);
                }
            })
        })
        request.on('error', (err) => {
            console.error(err);
            next(err);
        });
        request.end();
    } else {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send({error: true, message: error.details[0].message});
        }
        const user = await Register.findOne({email: req.body.email})
        if (! user) {
            return res.status(404).send({error: true, errorMessage: 'Invalid Email'});
        }
        const password = await bcrypt.compare(req.body.password, user.password)
        if (! password) {
            return res.status(400).send({error: true, errorMessage: 'Invalid Password'});
        }
        const token = jwt.sign({_id: user._id}, 'jwtPrivateKey');
        res.header('x-auth-token', token).send({error: false, message: `${user.email} has been Verified Succesfully`});
    }
}

module.exports.login = login;
