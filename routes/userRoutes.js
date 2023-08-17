const express=require("express")
const {UserModel}=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

//registration route
userRouter.post("/register",async (req,res)=>{
    const {username,email,pass}=req.body
    try{
        bcrypt.hash(pass, 5, async (err, hash) => {
            if(err){
                res.send({"error":err})
            } else {
                const user=new UserModel({username,email,pass:hash})
                await user.save()
                res.send({"msg":"New user has been registered"})
            }
        })
    } catch(err){
        res.send({"error":err})
    }
})

//login route
userRouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.username},"masai")
                    res.send({"msg":"Logged In!","token":token})
                } else {
                    res.send({"error":err})
                }
            })
        } else {
            res.send({"msg":"User does not exist!"})
        }

    } catch(err){
        res.send({"error":err})
    }
})


module.exports={
    userRouter
}