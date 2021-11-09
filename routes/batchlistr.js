const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Batches } = require('../models/batchlistm');


router.get('/getbatch', async (req, res) => { 
    const data = await Batches.find();
    res.send({error:false,response:data});
});

router.post('/addbatch',async (req,res) => {
  
    const batch = await Batches.insertMany(req.body)
    console.log(req.body);

        //     const {     batchName,
        //                 startDate ,
        //                 endDate ,
        //                 mentors,
        //                 trainers ,
        //                 progress} = req.body;
        //    const batch = await  Batches.insertMany({
        //                 batchName,
        //                 startDate ,
        //                 endDate ,
        //                 mentors,
        //                 trainers ,
        //                 progress
        //             })
    res.send({error:false,message:'Batchlist added successfully',response:batch})
});

router.put('/updatebatch/:id',async (req,res) => {
    console.log(req.body);
        const batch = await Batches.findByIdAndUpdate(req.params.id ,req.body,{new:true});
        res.send({error:false,message:'Batchlist updated successfully',response:batch})
    });


router.delete('/deletebatch/:id', async (req, res) => {
    const batch = await Batches.findByIdAndRemove(req.params.id)
    res.status(200).send({error:false,message:`the batch ${batch.id} has been deleted sucessfully`,response:batch});
})


module.exports = router;
