const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyTokenController = async (req,res) => {
    const {token} = req.query;

    if(!token){
        return res.status(404).json({success: false, msg: "Invalid Token!!"})
    }

    //decode Token
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secret');
    }catch(err){
        return res.status(400).json({success: false, msg: "Invalid Token!!", error:err})
    }

    //checking user is present or not
    const oldUser =await User.findOne({email: decodedToken.email});
    if(!oldUser){
        return res.status(400).json({ success: false, msg: "User Is Not Found!!"});
    }

    res.status(200).json({success: true, data:decodedToken.email })

};

module.exports = verifyTokenController;