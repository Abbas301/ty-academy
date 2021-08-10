const imageDetails = require("../models/image");
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
    const imagePaths = req.files;
    const url = req.protocol + "://" + req.get("host");
    let front = url + imagePaths.front[0].path;
    let back = url + imagePaths.back[0].path;
    let side = url + imagePaths.side[0].path;
    try {
        let images = await imageDetails.insertMany({front: front, back: back, side: side, userId: req.user._id});
        res.json({error: false, message: "file uploaded sucessfully", reponse: images})
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
        let images = await imageDetails.findByIdAndUpdate(req.params.id, {

            front: front,
            back: back,
            side: side
        }, {new: true});
        res.json({error: false, message: "file updated sucessfully", reponse: images})
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


module.exports = {
    postImage,
    storage,
    getAllImages,
    updateImage


};
