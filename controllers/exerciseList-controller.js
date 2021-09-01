const { ExerciseList }= require("../models/exerciseListm");
const multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");


var excelStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({
    storage: excelStorage,
    fileFilter : function(req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('uploadfile');

const postExerciseList = async (req, res, next) => {
    
    const excersize = req.body;
    excersize.userId=req.user._id
    try {
        const details = await ExerciseList.findOne({userId:req.user._id})
        if(details){
            return res.status(400).send({error:true , errorMessage:"exerciseList is already added with unique userID. Just update it!!!!"})
        }
        if(req.body.exerciseType){
            const inserted = await ExerciseList.insertMany(excersize);
        res.json({error: false, message: 'exerciseList inserted successfully', inserted});
        } else {
            var exceltojson;
        upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders:false
            },async function(err,result){
                let dataFromExcel=[];
                for(let excelData of result){
                    dataFromExcel.push(excelData);
               }
                  console.log(dataFromExcel);
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                const savedResult = await ExerciseList.insertMany(dataFromExcel);
                res.json({error_code:0,err_desc:null, data: savedResult});
                console.log(savedResult);
            });
        } catch (e){
            next(e)
        }
    })
        }
        
    } catch (err) {
        next(err);
    }
};


const putExerciseList = async (req, res, next) => {
    const {exerciseType, exerciseName, youTubeURL} = req.body;
    try {
        const inserted = await ExerciseList.findByIdAndUpdate(req.params.id,{
                exerciseType,
                exerciseName,
                youTubeURL
            },{new:true});

        res.json({error: false, message: 'exerciseList is  updated successfully', inserted});
    } catch (err) {
        next(err);
    }
};

const getExerciseList = async (req, res, next) => {
    try {
        let exercise = await ExerciseList.find();
        res.json({error: false, message: "exerciseList is uploaded sucessfully", response: exercise});
    } catch (err) {
        next(err);
    }
}

const deleteExerciseList = async (req, res, next) => {
    try {
        let exercise = await ExerciseList.findByIdAndDelete(req.params.id);
        res.json({error: false, message: "exerciseList is deleted sucessfully", response: exercise});
    } catch (err) {
        next(err);
    }
}


module.exports = {
    postExerciseList,
    getExerciseList,
    putExerciseList,
    deleteExerciseList
}
