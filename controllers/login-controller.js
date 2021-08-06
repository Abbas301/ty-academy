const { validate, Register } = require('../models/authm');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await Register.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Invalid email or Password');
    }
    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) {
        return res.status(400).send('Invalid email or Password');
    }
    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    res.send({error:false,message:"user verified successfully",token:token})
}

module.exports.login = login;