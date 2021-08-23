const express =require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer  = require('multer')

const exerciseListController= require('../controllers/exerciseList-controller');

router.post('/post-exercise',auth,exerciseListController.postExerciseList);
router.put('/put-exercise/:id',auth,exerciseListController.putExerciseList);
router.get('/get-exercise',auth,exerciseListController.getExerciseList);
router.delete('/delete-exercise/:id',auth,exerciseListController.deleteExerciseList);

router.post('/post-exercise-from-excel',multer({ storage: exerciseListController.storage }).single("uploadfile"),exerciseListController.excelData2MongoDB)



module.exports = router;  