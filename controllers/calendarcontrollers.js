const { validateCalendar,Calendarlist } = require('../models/calendarm');


async function addCalendar(req, res) {
    try {
        const {error} = validateCalendar(req.body);
        if (error) {
            return res.status(400).send({error: true, errorMessage: error.details[0].message});
        }
        const details = await Calendarlist.findOne({_id:req.body._id})
        if(details){
            return res.status(400).send({error:true , errorMessage:"candidate are already existed. Just update it!!!!"})
        }
        const data =req.body;
        candidate = new Calendarlist(data)
        const candidateData = await candidate.save();
        res.status(200).send({error:false, message:"calendar added successfully", response:candidateData});
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function updateCalendar(req, res) {
    try {
        let calendar = await Calendarlist.find({id:req.params.id});
        if(!calendar) {
          return res.status(400).send({error: true,errorMessage: "Could not find the calendar with this Id"});
        }
        const candidate = await Calendarlist.findByIdAndUpdate(req.params.id,req.body, {new: true})
        
        res.send({error:false, message:"Calendar updated successfully", response:candidate})
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

async function deleteCalendar(req, res) {
    try {
        // let calendar = await Calendarlist.find({_id:req.params._id});
        // if(!calendar) {
        //   return res.status(400).send({error: true,errorMessage: "Could not find the calendar with this Id"});
        // }
        const candidate = await Calendarlist.findByIdAndRemove(req.params.id)
        
        res.send({error:false, message:"Calendar deleted successfully", response:candidate})
    } catch (err) {
        console.log(err);
        console.log('error occured')
    }
}

module.exports.addCalendar = addCalendar;
module.exports.updateCalendar = updateCalendar;
module.exports.deleteCalendar = deleteCalendar;