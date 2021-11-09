const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addCalendar ,updateCalendar , deleteCalendar } = require('../controllers/calendarcontrollers');
const { Calendarlist } = require('../models/calendarm');

router.get('/calendar', async (req, res) => {
    const candidates = await Calendarlist.find();
    res.send(candidates);
});

router.post('/add-calendar', addCalendar);
router.put('/update-calendar/:id' , updateCalendar);
router.delete('/delete/:id' , deleteCalendar);

module.exports = router;