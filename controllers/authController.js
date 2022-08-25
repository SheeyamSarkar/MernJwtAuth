const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const tokenGenerator = require("../config/createToken");

const { sendVerificationEmail, sendForgotPasswordEmail } =require("../config/sendEmail");


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

            const sendMail = await sendVerificationEmail(newUser.email, link);

            if(sendMail){
                res.status(201).json({success:true, msg:"Registered Successfully! But Error in Verification Email"});
            }else{
                res.status(201).json({success:true, msg:"Registered Successfully!"});
            }
 
            
        });
    });
};



const loginController = async (req,res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ success: false, msg: "Invalied Email or Password!!"});
    }

    //find Old User
    const oldUser =await User.findOne({email});
    if(!oldUser){
        return res.status(400).json({ success: false, msg: "Invalied Email or Password!!"});
    }

    //compair password
    const comparePassword = await bcrypt.compare(password, oldUser.password);
    if(!comparePassword){
        return res.status(400).json({ success: false, msg: "Invalied Email or Password!!"});
    }

    //generateToken  with User info
    const token = tokenGenerator({email:oldUser.email, _id: oldUser._id});

    //Send Response
    res.status(201).json({success:true, token, msg:"You Are Logged In Successfully"});
    // res.send("All Correct");

};

const forgotPasswordController = async (req,res) => {
    const { email } = req.body;
    
    if(!email){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }
    //User Present Or Not
    const oldUser =await User.findOne({email});
    if(!oldUser){
        return res.status(400).json({ success: false, msg: "User Is Not Found!!"});
    }
    //Send Forgot password Email
    //generate Token
    const token = tokenGenerator({email:oldUser.email});
            
    //send mail
    const link = "http://"+req.hostname+ ":5001/api/auth/verifyToken?token="+ token;

    const sendMail = await sendForgotPasswordEmail(oldUser.email, link);

    if(sendMail){
        res.status(201).json({success:true, msg:"Error in Sending Email"});
    }else{
        res.status(201).json({success:true, msg:"Email Send!"});
    }
};

const resetPasswordController = async (req,res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    if(!email || !newPassword || !confirmNewPassword){
        return res.status(400).json({ success: false, msg: "Invalied Email or Password!!"});
    }

    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }

    //User Present Or Not
    const oldUser =await User.findOne({email});
    if(!oldUser){
        return res.status(400).json({ success: false, msg: "User Is Not Found!!"});
    }

    //compair password
    if(newPassword != confirmNewPassword){
        return res.status(400).json({ success: false, msg: "Password Not Match!!"});
    }

    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(newPassword, salt, async (err, hash)=> {
            const hashedPassword = hash;

            const updatedData = await User.findByIdAndUpdate({email},{
                $set:{
                    password: hashedPassword,
                },
            });
            if(updatedData){
                res.status(200).send({ success: true, msg: "Password Updated Successfully!!"});
            }else{
                res.status(500).send({ success: false, msg: "Something Went Wrong!!"});
            }
        });
    });

};


module.exports = { registerController, loginController, forgotPasswordController, resetPasswordController };