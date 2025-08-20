const express = require('express');
const router = express.Router();
const MenuItem = require("../models/MenuItem.js");

router.get("/", async (req,res)=>{
  try{
    const Menudata =  await MenuItem.find();
    console.log("Menu items is fetched");
    res.status(200).json(Menudata);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});

  }
})

router.get('/:tasteType',async (req,res)=>{
 try{
   const tasteType=req.params.tasteType;
   if(tasteType=='spicy'||tasteType=='sour'||tasteType=='sweet'){
    response= await MenuItem.find({taste: tasteType});
    console.log("Taste type found");
    res.status(200).json(response);
   }else{
    res.status(404).json({error:'Invalid taste type'});
   }
 }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal server error'});
 }
})

router.post("/", async(req,res)=>{
  try{
    const menuData = req.body;
    const newMenu = new MenuItem(menuData);
    const savedMenuData = await newMenu.save();
    console.log("Menu Items is saved in database");
    res.status(200).json(savedMenuData);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.put('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id;
      const updateMenu=req.body;
      const response = await MenuItem.findByIdAndUpdate(menuId,updateMenu,{
        new: true,
        runValidator:true
      })
      if(!response){
        res.status(404).json({error:'Menu Item not found'});
      }
      console.log("Menu item updated");
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
})

router.delete("/:id", async(req,res)=>{
    try{
       const menuId = req.params.id;
       const response = await MenuItem.findByIdAndDelete(menuId);
       if(!response){
        res.status(404).json({error:'Menu item not found'});
       }
       console.log("Menu Item deleted");
       res.status(200).json({message:'Menu Item deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports= router;