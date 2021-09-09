const { Recipe } = require('../models/recipem');
const _ = require('lodash');
const multer = require("multer");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = "Invalid mimetype";
        if (isValid) {
            error = null;
        }
        cb(error, "public/recipies");
    },
    filename: async (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
}) ;

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

async function postRecipe(req, res , next) {
    try {
            const imagePaths = req.files;
            let recipeImagePaths=[];
            const url = req.protocol + "://" + req.get("host");
            for(let image of imagePaths){
            recipeImagePaths.push(url+image.path)
            }
            const recipies =req.body;
            recipies.userId = req.user._id
            recipies.recipeImage = recipeImagePaths;
            const recipe = await Recipe.insertMany(recipies);
            res.json({error:false,message:"Recipe added successfully",response:recipe});    

    } catch (err) {
        console.log("error!!!!! raised here");
        next(err)
        console.log(err);
    }
}

async function putRecipe(req, res ,next) {
    const imagePaths = req.files;
    let recipeImagePaths=[];
    const url = req.protocol + "://" + req.get("host");
     for(let image of imagePaths){
         recipeImagePaths.push(url+image.path)
     }
    try {
        const recipies =req.body;
        recipies.recipeImage = recipeImagePaths
        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id,recipies,{new:true});
       res.json({error:false,message:"Recipe Updated successfully",response:updateRecipe});
    } catch (err) {
        next(err)
        console.log('error occured')
    }
}

async function deleteRecipe(req, res ,next) {
    const removeRecipe = await Recipe.findByIdAndRemove(req.params.id)
    if(!removeRecipe) return res.status(404).send("Recipe is not existed by this id")
    res.json({error:false,message:"Recipe is deleted successfully",response:removeRecipe})
}

async function getRecipies(req, res ,next) {
    const recipies = await Recipe.find()
    res.json({error:false,message:"Recipes fetched successfully",response:recipies})
}

exports.postRecipe = postRecipe;
exports.putRecipe = putRecipe;
exports.storage =storage;
exports.deleteRecipe = deleteRecipe;
exports.getRecipies = getRecipies;
exports.postExcelRecipe = postExcelRecipe;

