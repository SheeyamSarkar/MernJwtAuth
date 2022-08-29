const bcrypt = require("bcryptjs");
const Employee = require("../models/employeeModel");
const tokenGenerator = require("../config/createToken");
const { sendEmployeeVerificationEmail } =require("../config/sendEmail");

const addEmployee = async (req,res) => {
    const { email } = req.body;

    if(!email){
        return res.status(400).json({ success: false, msg: "Please Fill All The Fields!!"});
    }
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }

    //Employee email check
    const oldEmployee =await Employee.findOne({email});
    if(oldEmployee){
        return res.status(403).json({ success: false, msg: "Email Already Exist"});
    }

    const newEmployee = new Employee({
        email
    });

    await newEmployee.save();

    //generate Token
    const token = tokenGenerator({email:newEmployee.email});
            
    //send mail
    const link = "http://"+req.hostname+ ":5001/api/employeeemail/verify?token="+ token;

    const sendMail = await sendEmployeeVerificationEmail(newEmployee.email, link);

    if(sendMail){
        res.status(201).json({success:true, msg:"Email Send Successfully! But Error in Verification Email"});
    }else{
        res.status(201).json({success:true, msg:"Email Send Successfully!"});
    }

    // res.status(201).json({success:true, msg:"Employee Added Successfully"});

};

const addEmployeeInfo = async (req,res) => {

    const { email, name, phone, password } = req.body;

    if(!email || !name || !phone|| !password){
        return res.status(400).json({ success: false, msg: "Invalied Email!!"});
    }

    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({ success: false, msg: "Please Enter Valied Email!!"});
    }
    if(password.length<6){
        return res.status(400).json({ success: false, msg: "Password Must be geter then 6!!"});
    }

    //Employee Email Present Or Not
    const oldEmployee =await Employee.findOne({email});
    if(!oldEmployee){
        return res.status(400).json({ success: false, msg: "Employee Is Not Found!!"});
    }

    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(password, salt, async (err, hash)=> {
            const hashedPassword = hash;

            const updatedData = await Employee.findByIdAndUpdate({_id: oldEmployee._id},{
                $set:{
                    name,phone,password: hashedPassword,
                },
            });
            if(updatedData){
                res.status(200).send({ success: true, msg: "Info Updated Successfully!!"});
            }else{
                res.status(500).send({ success: false, msg: "Something Went Wrong!!"});
            }
        });
    });
};


module.exports = { addEmployee, addEmployeeInfo };
