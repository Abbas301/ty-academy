const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addCandidate ,updateCandidate } = require('../controllers/candidatecontrollers');
const { Candidates } = require('../models/candidatesm');

router.get('/candidates', async (req, res) => {
    const candidates = await Candidates.find();
    res.send(candidates);
});

router.post('/add-candidates', addCandidate);
router.put('/update-candidates/:id' , updateCandidate);

module.exports = router;