const {User , validateUser} = require('../models/usersm');


async function addUser(req, res) {
    try {
        const {error} = validateUser(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const details = await User.findOne({email:req.body.email})
        if(details){
            return res.status(400).send({error:true , errorMessage:"User are already existed. Just update it!!!!"})
        }
        const data =req.body;
        user = new User(data);
        const candidateData = await user.save();
        res.status(200).send({error:false, message:"User details are added successfully", response:candidateData});
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function updateUser(req, res) {
    try {
        let person = await User.find({id:req.params.id});
        if(!person) {
          return res.status(400).send({error: true,errorMessage: "Could not find the user with this Id"});
        }
        const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true})
        
        res.send({error:false, message:"User details are updated successfully", response:user})
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

module.exports.addUser = addUser;
module.exports.updateUser = updateUser;