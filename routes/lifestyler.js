const express = require('express');
const router = express.Router();
const {addLifestyle} =require('../controllers/lifestyle-controllers');
const {Lifestyle} = require('../models/lifestyle');

router.post('/lifestyle',addLifestyle);

router.get('/lifestyle',async (req,res) => {
    const lifestyle = await Lifestyle.find();
    res.send(lifestyle);
})

module.exports = router;