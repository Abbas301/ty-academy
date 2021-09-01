const { Recipe } = require('../models/recipem');
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

const postExcelRecipe = async (req, res, next) => {
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
                for(let excelData of result){
                    dataFromExcel.push(excelData);
               }
                  console.log(dataFromExcel);
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                const savedResult = await Recipe.insertMany(dataFromExcel);
                res.json({error_code:0,err_desc:null, data: savedResult});
                console.log(savedResult);
            });
        } catch (e){
            next(e)
        }
    })
    } catch (err) {
        next(err);
    }
};

exports.postExcelRecipe = postExcelRecipe;