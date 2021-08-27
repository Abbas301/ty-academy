const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const { Personal,Goal } = require('../models/demographicsm');
const { BodyFitness,Image } = require('../models/bodyprofilem');
const {goals, putGoals ,userDetails,updateDetails} = require('../controllers/demographics-controllers')
const {imageController, bodyFitness, putBodyFitness} = require('../controllers/bodyprofile-controllers');


router.get('/personalinfo',auth, async (req, res) => {
    const persons = await Personal.find();
    res.send(persons);
})

router.get('/goals',auth, async (req, res) => {
    const goals = await Goal.find();
    res.send(goals);
})

router.get('/images', async (req, res) => {
    const images = await Image.find();
    res.send(images); 
});

router.get('/bodyfitness', async (req, res) => {
    const bodyFitness = await BodyFitness.find();
    res.send(bodyFitness);
})

router.post('/add-personalinfo',auth,userDetails)
router.put('/put-personalinfo/:id',auth,updateDetails)
router.post('/add-goals',auth, goals)
router.put('/put-goals/:id',auth, putGoals)
router.post('/add-images', auth, multer({ storage: imageController.storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }, { name: 'side', maxCount: 1 }]), imageController.postImage);
router.put('/put-images/:id',auth, multer({ storage: imageController.storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }, { name: 'side', maxCount: 1 }]), imageController.updateImage);
router.post('/add-bodyfitness',auth, bodyFitness)
router.put('/put-bodyfitness/:id',auth, putBodyFitness)


module.exports = router;