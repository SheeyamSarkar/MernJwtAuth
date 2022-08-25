const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'margarett62@ethereal.email',
        pass: 'F9th7yksbctPxUDDGx'
    }
});
// user: 'antopolis.dev@gmail.com',
// pass: 'ksaqzndrucddszzc'

module.exports = async (senderAddress,link)=>{
    let error =false;
    try{
        await transporter.sendMail({
            from: '"Sheeyam Bro 👻" <sheeyam@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "Verify Email ✔", // Subject line
            html: `Click <a href="${link}">Here</a><br> Valied For 1Hour`, // html body
        });
    }catch(e){
        error = true;
    }

    return error;


}