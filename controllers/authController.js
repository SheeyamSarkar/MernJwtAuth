const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const tokenGenerator = require("../config/createToken");
const emailSender =require("../config/sendEmail");
const registerController = async (req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ success: false, msg: "Please Fill All The Fields!!"});
    }
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }
    if(password.length<6){
        return res.status(400).json({ success: false, msg: "Password Must be geter then 6!!"});
    }
    //old email check
    const oldUser =await User.findOne({email});
    if(oldUser){
        return res.status(403).json({ success: false, msg: "Email Already Exist"});
    }

    //User model & create new user
    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(password, salt, async (err, hash)=> {
            const hashedPassword =hash;

            const newUser = new User({
                name,email,password:hashedPassword
            });

            await newUser.save();

            //generate Token
            const token = tokenGenerator({email:newUser.email});
            
            //send mail
            const link = "http://"+req.hostname+ ":5001/api/email/verify?token="+ token;

            const sendMail = await emailSender(newUser.email, link);

            if(sendMail){
                res.status(201).json({success:true, msg:"Registered Successfully! But Erron in Verification Email"});
            }else{
                res.status(201).json({success:true, msg:"Registered Successfully!"});
            }
 
            
        });
    });
};

module.exports = { registerController };