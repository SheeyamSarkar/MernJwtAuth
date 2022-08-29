const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const Employee = new Schema({
    name : {
        type : String,
        // required : true,
    },
    phone : {
        type : String,
        // required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        // required : true,
    },
},{
    timeseries : true
});

module.exports = mongoose.model("employees", Employee);