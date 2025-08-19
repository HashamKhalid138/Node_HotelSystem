const express = require("express");
const router = express.Router();
const Person = require("./models/person");

router.post("/", async (req, res) => {
  try {
    const Persondata = req.body;
    const newPerson = new Person(Persondata);
    const savedPerson = await newPerson.save();
    console.log("Person's data is saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Persondata = await Person.find();
    console.log("Person's data is fetched");
    res.status(200).json(Persondata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("Work type found");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedperson = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedperson,{
            new:true,
            runValidators:true
        });
        if(!response){
            console.log("Person not found");
            res.status(404).json({error:'Person not found'});
        }
        console.log("Person record updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
       const personId = req.params.id;
       const response= await Person.findByIdAndDelete(personId);
       if(!response){
        res.status(404).json({error:'Person not found'});
       }
       console.log("Person record is deleted successfully");
       res.status(200).json({message:"Person record deleted"});
    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal server error'});
    }
})
module.exports = router;
