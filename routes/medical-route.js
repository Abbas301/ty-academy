const express = require('express');
const router = express.Router();

const {addMedicalDetails,updateMedicalDetails} = require('../controllers/medical-controllers')
const { MedicalHistory } = require("../models/medicalm");

router.get('/getmedicaldetails',async (req, res) => { 
    const medicalDetails = await MedicalHistory.find();
    res.status(200).send({error:false,medicalDetails:medicalDetails});
});

router.post('/addmedicaldetails',addMedicalDetails);

router.put('/updatemedicaldetails',updateMedicalDetails);

module.exports = router;