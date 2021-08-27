const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');

const {postRecipe,putRecipe,getRecipies,deleteRecipe,storage} = require('../controllers/recipe-controller')

router.get('/getrecipies',auth,getRecipies);
router.post('/postrecipe', auth ,multer({storage:storage}).array('recipeImage'),postRecipe);
router.put('/putrecipe/:id', auth ,multer({storage:storage}).array('recipeImage'),putRecipe);
router.delete('/deleterecipe/:id',auth,deleteRecipe);

module.exports = router;