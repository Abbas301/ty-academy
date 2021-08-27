const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const multer = require('multer')
const {addMedicalDetails,storage,updateMedicalDetails} = require('../controllers/medical-controllers')
const { MedicalHistory } = require("../models/medicalm");

router.get('/getmedicaldetails',async (req, res) => { 
    const medicalDetails = await MedicalHistory.find();
    res.status(200).send({error:false,medicalDetails:medicalDetails});
});

router.post('/addmedicaldetails',multer({storage:storage}).fields([
    { name: 'cmhPrescription', maxCount: 1 },
    { name: 'cmhIR', maxCount: 1 }, 
    { name: 'pmhPrescription', maxCount: 1 }, 
    { name: 'pmhIR', maxCount: 1 },
    { name: 'psPrescription', maxCount: 1 }, 
    { name: 'psIR', maxCount: 1 },
    { name: 'ptPrescription', maxCount: 1 }, 
    { name: 'ptIR', maxCount: 1 },
    { name: 'recentIR', maxCount: 1 }
]),addMedicalDetails);

router.put('/updatemedicaldetails',auth,multer({storage:storage}).fields([
    { name: 'cmhPrescription', maxCount: 1 },
    { name: 'cmhIR', maxCount: 1 }, 
    { name: 'pmhPrescription', maxCount: 1 }, 
    { name: 'pmhIR', maxCount: 1 },
    { name: 'psPrescription', maxCount: 1 }, 
    { name: 'psIR', maxCount: 1 },
    { name: 'ptPrescription', maxCount: 1 }, 
    { name: 'ptIR', maxCount: 1 },
    { name: 'recentIR', maxCount: 1 }
]),updateMedicalDetails);

module.exports = router;