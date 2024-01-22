const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SCERET='MainUdnaChahtaHoonGirnaBhiChahtaHoonBusRuknaNahiChahta';
var fetchuser=require('../middleware/fetchuser');

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwords must not be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:'Sorry a user with this email already exists'})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(data,JWT_SCERET);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error')
    }
});

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async (req,res)=>{
    let success=false;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:'Please try to login with correct credentials'});
        }
        const pwdcompare=await bcrypt.compare(password,user.password);
        if(!pwdcompare){
            success=false;
            return res.status(400).json({success,error:'Please try to login with correct credentials'});
        }

        const data={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(data,JWT_SCERET);
        success=true;
        res.json({success,authToken});

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});
module.exports = router;