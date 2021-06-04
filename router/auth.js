const express=require('express');
require('../db/conn');
const Data=require('../userSchema/userSchema');
const router=express.Router();
const bcrypt=require('bcryptjs');

router.get('/',(req,res)=>{
    res.send("we are in routr");
})

router.post('/register',async(req,res)=>{
   const{name,email,password}=req.body;
   if(!name||!email||!password){
       res.status(400).json({err:"emapty filde"})
   }
   const findData=await Data.findOne({email:email});
   if(findData){
    res.status(400).json({err:"user already registed"})
   }else{
       const data=new Data({name,email,password});
       const saveData=await data.save();
       if(!saveData){
           res.status(400).json({err:"unsuccessful"});
       }else{
        res.status(200).json({message:"successful"}); 
       }

   }
})

router.post("/signin",async(req,res)=>{
    try{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400).json({err:"emapty filde"})
    }
    const data=await Data.findOne({email:email});
    if(!data){
        res.status(400).json({err:"invalid entry"})
    }
    else{
        const isMatch=await bcrypt.compare(password,data.password);

        if(!isMatch){
            res.status(400).json({err:"invalid entry"})
        }else{
            res.status(400).json({message:"signin successful"})
        }

    }


}catch(e){
 console.log(e);
}

})

module.exports=router;