const { Recipe} = require('../models/recipem');
const _ = require('lodash');
const multer = require("multer");

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
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
async function recipe(req, res , next) {
    const imagePaths = req.files;
   let recipeImagePaths=[];
   let userid = req.user._id;
   console.log(userid);
   const url = req.protocol + "://" + req.get("host");
    for(let image of imagePaths){
        recipeImagePaths.push(url+image.path)
    }
    try {
        const {recipeType,description,ingrediants,carbohydrates,fat,calories,recipeName,cookingProcess,provideYouTubeLink,protein,fiber} = req.body;
       const recipe = await Recipe.insertMany({
            recipeType,description,ingrediants,carbohydrates,fat,calories,recipeName,cookingProcess,provideYouTubeLink,protein,fiber,recipeImage:recipeImagePaths,userId:userid
        });
      res.json({error:false,message:"Recipe added successfully",response:recipe});
    } catch (err) {
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
        const {recipeType,description,ingrediants,carbohydrates,fat,calories,recipeName,cookingProcess,provideYouTubeLink,protein,fiber} = req.body;
        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id,{
            recipeType,description,ingrediants,carbohydrates,fat,calories,recipeName,cookingProcess,provideYouTubeLink,protein,fiber,recipeImage:recipeImagePaths
         },{new:true});
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

exports.recipe = recipe;
exports.putRecipe = putRecipe;
exports.storage = storage;
exports.deleteRecipe = deleteRecipe;
exports.getRecipies = getRecipies;
