const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addUser ,updateUser } = require('../controllers/usercontrollers');
const { User } = require('../models/usersm');

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/add-user', addUser);
router.put('/update-user/:id' , updateUser);

module.exports = router;