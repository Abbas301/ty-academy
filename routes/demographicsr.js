const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const { Personal } = require('../models/demographicsm');
const { Goal } = require('../models/demographicsm')
const {goals, putGoals ,userDetails,updateDetails} = require('../controllers/demographics-controllers')
const {imageController, bodyFitness, putBodyFitness} = require('../controllers/bodyprofile-controllers');


router.get('/details',auth, async (req, res) => {
    const persons = await Personal.find();
    res.send(persons);
})

router.get('/goals',auth, async (req, res) => {
    const goals = await Goal.find();
    res.send(goals);
})

router.get('/images', imageController.getAllImages)

router.get('/bodyfitness', async (req, res) => {
    const bodyFitness = await BodyFitness.find();
    res.send(bodyFitness);
})

router.post('/details',auth,userDetails)
router.put('/details/:id',auth,updateDetails)
router.post('/goals',auth, goals)
router.put('/putgoals/:id',auth, putGoals)
router.post('/images', auth, multer({ storage: imageController.storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }, { name: 'side', maxCount: 1 }]), imageController.postImage);
router.put('/images/:id',auth, multer({ storage: imageController.storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }, { name: 'side', maxCount: 1 }]), imageController.updateImage);
router.post('/bodyfitness',auth, bodyFitness)
router.put('/putbodyfitness/:id',auth, putBodyFitness)


module.exports = router;