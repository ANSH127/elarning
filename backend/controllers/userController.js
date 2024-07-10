const User=require('../models/userModel')
const jwt=require('jsonwebtoken')


const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
}



// login user



const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.login(email,password)
        const token=createToken(user._id)
        // console.log(user);
        const role=user.role;
        res.status(200).json({email,token,role})
    }catch(err){
        res.status(400).json({message:err.message})
    }
    
}

// signup user

const signupUser=async(req,res)=>{

    const {email,password,name,role}=req.body
    console.log(email,password,name);
    try{
        const user=await User.signup(name,email,password,role)
        const token=createToken(user._id)
        res.status(201).json({name,email,token})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}


// add role to user api

const addRole=async(req,res)=>{
    const {role}=req.body
    try{
        const user=await User.findById(req.user._id)
        user.role=role
        await user.save()
        res.status(200).json({message:'Role added successfully'})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports={loginUser,signupUser}