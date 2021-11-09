const { validateCandidate,Candidates } = require('../models/candidatesm');


async function addCandidate(req, res) {
    try {
        const {error} = validateCandidate(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const details = await Candidates.findOne({email:req.body.email})
        if(details){
            return res.status(400).send({error:true , errorMessage:"Goals are already existed. Just update it!!!!"})
        }
        const data =req.body;
        candidate = new Candidates(data)
        const candidateData = await candidate.save();
        res.status(200).send({error:false, message:"candidate details are added successfully", response:candidateData});
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function updateCandidate(req, res) {
    try {
        let person = await Candidates.find({id:req.params.id});
        if(!person) {
          return res.status(400).send({error: true,errorMessage: "Could not find the user with this Id"});
        }
        const candidate = await Candidates.findByIdAndUpdate(req.params.id,req.body, {new: true})
        
        res.send({error:false, message:"Candidate details are updated successfully", response:candidate})
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

module.exports.addCandidate = addCandidate;
module.exports.updateCandidate = updateCandidate;