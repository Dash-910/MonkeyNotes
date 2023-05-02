const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} =require('express-validator');
var fetchuser = require('../middleware/fecthuser')
const bcyrpt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET ='secretcode';

//Created a user using POST "/api/auth/".Doesn't 
router.post('/createuser',[body('name','Enter a valid name').isLength({min:3}),
body('email','Enter a valid email').isEmail(),
body('password','Password Must be alleast 5 characters').isLength({min:5})],async(req,res)=>{
    //If there are any errors,Then return bad request along with the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    // Check whether the user with this email already exits
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"A user with this email already exists"})
        }
        const salt= await bcyrpt.genSalt(10);
        const secPass = await bcyrpt.hash(req.body.password,salt);

        user = await User.create({
            name:req.body.name,
            password :secPass,
            email:req.body.email,
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken})
    }catch(error)
    {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
 
//Authenticate a User using :POST"/api/auth/login". At this stage no login will be required
router.post('/login',[
    body('email','Enter a valid emil').isEmail(),
    body('password','Password cannot be blank').exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await bcyrpt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please Try to login with correct credentials"})
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken})
    }catch(error)
    {
        console.log(error.message);
        res.status(500).send(
            "Internal Server Error"
        );
    }
})
// Get logged in Usert details using :Post"/api/auth/getuser" Login will be required here

router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId=req.user.id;
        //User the model schema defined,findOne is use to fetch a single document
        //userID is received from the fetch middleware function after it verfies the token
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send(
            "Internal Server Error"
        )
    }
})

module.exports=router
