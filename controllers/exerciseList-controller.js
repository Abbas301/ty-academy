const exerciseLists = require("../models/exerciseListm");
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = "Invalid exceltype";
        cb(error,'/public/excelFile')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

let excelData2MongoDB = (req, res)=>{importExcelData2MongoDB( '/public/excelFile'+ req.file.filename)}

async function importExcelData2MongoDB(filePath){
    try{
        // -> Read Excel File to Json Data
    const excelData = await excelToJson({
        sourceFile: filePath,
        sheets:[{
            // Excel Sheet Name
            name: 'ExerciseList',
            // Header Row -> be skipped and will not be present at our result object.
            header:{
               rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'exerciseType',
                B: 'exerciseName',
                C: 'youTubeURL',
            }
        }]
    });
    // -> Log Excel Data to Console
    console.log(excelData);
    const exerciseList = await exerciseLists.insertMany(excelData);
res.json({error: false, message: 'exerciseList inserted successfully from Excel', exerciseList});
fs.unlinkSync(filePath);
    }catch(err){
        console.log(err,"error occured");
    } 
}


const postExerciseList = async (req, res, next) => {
    let userid = req.user._id
    const {exerciseType, exerciseName, youTubeURL} = req.body;
    console.log(req.body);
    try {
        const inserted = await exerciseLists.insertMany({
                exerciseType,
                exerciseName,
                youTubeURL,
                userId:userid

            });

        res.json({error: false, message: 'exerciseList inserted successfully', inserted});
    } catch (err) {
        next(err);
    }
};


const putExerciseList = async (req, res, next) => {
    const {exerciseType, exerciseName, youTubeURL} = req.body;
    try {
        const inserted = await exerciseLists.findByIdAndUpdate(req.params.id,{
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
        let exercise = await exerciseLists.find();
        res.json({error: false, message: "exerciseList is uploaded sucessfully", response: exercise});
    } catch (err) {
        next(err);
    }
}

const deleteExerciseList = async (req, res, next) => {
    try {
        let exercise = await exerciseLists.findByIdAndDelete(req.params.id);
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
    excelData2MongoDB,
    storage
}
