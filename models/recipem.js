const Joi = require('joi');
const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', new mongoose.Schema({
         recipeType:{
             type:String,
             required:true
         },
         description:{
             type:String,
             required:true
         },
         ingrediants:{
             type:Array,
             required:true
         },
         carbohydrates:{
             type:String,
             required:true
         },
         fat:{
             type:String,
             required:true
         },
         calories:{
             type:String,
             required:true
         },
         recipeName:{
             type:String,
             required:true
         },
         cookingProcess:{
             type:String,
             required:true
         },
         provideYouTubeLink:{
             type:String,
             required:true
         },
         protein:{
            type:String,
            required:true
        },
        fiber:{
            type:String,
            required:true
        },
        recipeImage:{
            type:Array,
            required:true
        },
        userId:{
            type:String
        }
        })
        )

        // function recipeValidate(recipe){
        //     const schema = {
        //         recipeType   : Joi.required().string(),
        //         description  : Joi.required(),
        //         ingrediants : Joi.required().string(),
        //         carbohydrates : Joi.required().string(),
        //         fat : Joi.required().string(),
        //         calories : Joi.required().string(),
        //         recipeName : Joi.required().string(),
        //         cookingProcess : Joi.required().string(),
        //         provideYouTubeLink : Joi.required().string(),
        //         protein : Joi.required().string(),
        //         fiber : Joi.required().string(),
        //         recipeImage : Joi.required(),
        //     }
        //     return Joi.validate(recipe,schema)
        // }

        module.exports.Recipe = Recipe;
        // module.exports.recipeValidate = recipeValidate;