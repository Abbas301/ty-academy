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

        module.exports.Recipe = Recipe;