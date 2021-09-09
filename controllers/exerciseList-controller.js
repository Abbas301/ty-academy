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
}).single('uploadFile');

async function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        url.match(p)[1];
        return true;
    }
    return false;
}
const postExcelExercise = async (req, res, next) => {
    try {
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
                let verifiedYoutubeUrl=[];
                for(let excelData of result){
                    dataFromExcel.push(excelData);
                    verifiedYoutubeUrlBoolean =await matchYoutubeUrl(excelData.youTubeURL);
                    verifiedYoutubeUrl.push(verifiedYoutubeUrlBoolean)
               }
               let checker = a => a.every(v => v === true);
               let validateUtl = checker(verifiedYoutubeUrl);
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                if(validateUtl === true){
                    const savedResult = await ExerciseList.insertMany(dataFromExcel);
                    res.json({error_code:0,err_desc:null, data: savedResult});
                }else {
                    res.json({error:true,message:"Invalid Youtube Url"})
                } 
            });
        } catch (e){
            next(e)
        }
    })
    } catch (err) {
        next(err);
    }
};


const postExerciseList = async (req, res, next) => {
    
    const excersize = req.body;
    excersize.userId=req.user._id
   let verifiedYoutubeUrl =await matchYoutubeUrl(excersize.youTubeURL)
    try {
        if(verifiedYoutubeUrl === true){
            const inserted = await ExerciseList.insertMany(excersize);
            res.json({error: false, message: 'exerciseList inserted successfully', inserted});
        }else {
            res.json({error:true,message:"Invalid Youtube Url"})
        }
       
    } catch (err) {
        next(err);
    }
};


const putExerciseList = async (req, res, next) => {
    const exercise = req.body;
   let verifiedYoutubeUrl =await matchYoutubeUrl(excersize.youTubeURL)
    try {
        if(verifiedYoutubeUrl === true){
        const inserted = await ExerciseList.findByIdAndUpdate(req.params.id,exercise,{new:true});
        res.json({error: false, message: 'exerciseList is  updated successfully', inserted});
        }else{
            res.json({error:true,message:"Invalid Youtube Url"})
        }
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
    deleteExerciseList,
    postExcelExercise
}
