const {Image,bodyFitnessValidate, BodyFitness} = require('../models/bodyprofilem');
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
        cb(error, "public/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

const postImage = async (req, res, next) => {

    const imageExist = await Image.findOne({
        userId: req.user._id,  
      });
      if (imageExist) {
        return res.status(400).send({ error: true, errorMessage: "Images already added with this userId" });
      }
    const imagePaths = req.files;
    const url = req.protocol + "://" + req.get("host");
    let front = url + imagePaths.front[0].path;
    let back = url + imagePaths.back[0].path;
    let side = url + imagePaths.side[0].path;
    try {
        let images = await Image.insertMany({front: front, back: back, side: side, userId: req.user._id});
        res.json({error: false, message: "file uploaded sucessfully", response: images})
    } catch (err) {
        next(err);

    }
};

const updateImage = async (req, res, next) => {
    const imagePaths = req.files;
    const url = req.protocol + "://" + req.get("host");
    let front = url + imagePaths.front[0].path;
    let back = url + imagePaths.back[0].path;
    let side = url + imagePaths.side[0].path;
    try {
        let images = await Image.findByIdAndUpdate(req.params.id, {
            front: front,
            back: back,
            side: side
        }, {new: true});
        if (! images) 
        {
          return res.status(404).send('user is not found by this id')
        }
        res.json({error: false, message: "file updated sucessfully", response: images})
    } catch (err) {
        next(err);
        console.log("error occured in catch block");

    }
};

const getAllImages = async (req, res, next) => {
    try {
        const images = await imageDetails.find();
        res.status(200).json({error: false, message: " sucessfully rendered all images", response: images});
    } catch (err) {
        next(err);
    }
};

async function bodyFitness(req, res) {
    try {
        const {error} = bodyFitnessValidate(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }

        const bodyExist = await BodyFitness.findOne({
            userId: req.user._id,  
          });
          if (bodyExist) {
            return res.status(400).send({ error: true, errorMessage: "BodyMeasurements already added with this userId" });
          }

        bodyFitness = new BodyFitness({
            bodyMeasurements: {
                height: req.body.bodyMeasurements.height,
                weight: req.body.bodyMeasurements.weight,
                armCircumference: req.body.bodyMeasurements.armCircumference,
                chestCircumference: req.body.bodyMeasurements.chestCircumference,
                waistCircumference: req.body.bodyMeasurements.waistCircumference,
                hipCircumference: req.body.bodyMeasurements.hipCircumference,
                thighCircumference: req.body.bodyMeasurements.thighCircumference,
                calfCircumference: req.body.bodyMeasurements.calfCircumference
            },
            bodyComposition: {
                fat: req.body.bodyComposition.fat,
                skeletalMuscle: req.body.bodyComposition.skeletalMuscle,
                visceralFat: req.body.bodyComposition.visceralFat,
                totalBodyWater: req.body.bodyComposition.totalBodyWater,
                bodyAge: req.body.bodyComposition.bodyAge
            },
            userId:req.user._id
        })
        const bodyFitness1 = await bodyFitness.save();
        console.log(bodyFitness1);
        res.send(bodyFitness1);
    } catch (err) {
        console.log('error occured')
    }
}

async function putBodyFitness(req, res) {
    try {
        const {error} = bodyFitnessValidate(req.body)
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message})
        }
        const bodyFitness = await BodyFitness.findByIdAndUpdate(req.params.id, {
            bodyMeasurements: {
                height: req.body.bodyMeasurements.height,
                weight: req.body.bodyMeasurements.weight,
                armCircumference: req.body.bodyMeasurements.armCircumference,
                chestCircumference: req.body.bodyMeasurements.chestCircumference,
                waistCircumference: req.body.bodyMeasurements.waistCircumference,
                hipCircumference: req.body.bodyMeasurements.hipCircumference,
                thighCircumference: req.body.bodyMeasurements.thighCircumference,
                calfCircumference: req.body.bodyMeasurements.calfCircumference
            },
            bodyComposition: {
                fat: req.body.bodyComposition.fat,
                skeletalMuscle: req.body.bodyComposition.skeletalMuscle,
                visceralFat: req.body.bodyComposition.visceralFat,
                totalBodyWater: req.body.bodyComposition.totalBodyWater,
                bodyAge: req.body.bodyComposition.bodyAge
            }
        }, {new: true})
        if (! bodyFitness) 
            return res.status(404).send('customer is not found by this id')
        
        res.send(bodyFitness);
    } catch (err) {
        console.log('error occured')
    }
}

module.exports.imageController = {
    postImage,
    storage,
    getAllImages,
    updateImage
};
exports.bodyFitness = bodyFitness;
exports.putBodyFitness = putBodyFitness;
