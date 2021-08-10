const express =require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');

const imageController= require('../controllers/image-controller');


router.get('/get-images',imageController.getAllImages)
router.post('/post-images',auth,multer({storage:imageController.storage}).fields([{name:'front',maxCount:1},{name:'back',maxCount:1},{name:'side',maxCount:1}]) ,imageController.postImage);
router.put('/update-images/:id',multer({storage:imageController.storage}).fields([{name:'front',maxCount:1},{name:'back',maxCount:1},{name:'side',maxCount:1}]),imageController.updateImage);

module.exports = router;