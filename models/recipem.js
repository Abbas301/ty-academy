const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', new mongoose.Schema({
         recipeType:{
             type:String
         },
         description:{
             type:String
         },
         ingrediants:{
             type:Array
         },
         carbohydrates:{
             type:String
         },
         fat:{
             type:String
         },
         calories:{
             type:String
         },
         recipeName:{
             type:String
         },
         cookingProcess:{
             type:String
         },
         provideYouTubeLink:{
             type:String
         },
         protein:{
            type:String
        },
        fiber:{
            type:String
        },
        recipeImage:{
            type:Array
        }
        })
        )

        module.exports.Recipe = Recipe;