const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/userModel')
const { response } = require('express')
const jwt=require("jsonwebtoken")
const authMiddleware= require("../middlewares/authMidlewares")

router.post('/register', async(req,res)=>{
    try {
        const userExist= await User.findOne({email:req.body.email})
        if (userExist){ 
            return res.status(200).send({message:'User Already Exist',success:false}) //it is retur func so it well come out
        }
        const password=req.body.password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        req.body.password=hashedPassword
        const newUser=new User(req.body)


        
        await newUser.save();
        res.status(200).send({message:"User Created Successfully",success:true}) //sucess prop is used to check on the front end
        


        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error in Creating User",success:false,error})
    }
})
router.post('/login' , async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message:'User does not exists',success:false});
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:"password is incorrect",succuss:false})

        }else{
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
            res.status(200).send({message:"login successful",success:true,data:token})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error logging in",success:false,error})
    }
})
router.post('/get-user-info-by-id',authMiddleware,async(req,res)=>{
    try {
        const user=await  User.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({message:"user does not exits",success:false})
        }else{
            res.status(200).send({success:true,data:{name:user.name,email:user.email}})
        }
    } catch (error) {
        res.status(500).send({message:"error in getting user info",success:false,error})
    }
})
module.exports =router