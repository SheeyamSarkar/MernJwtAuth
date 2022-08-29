const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        // user: 'enid.emmerich71@ethereal.email',
        // pass: 'SDBq6SYBf11QyY4kut'
        user: 'antopolis.dev@gmail.com',
        pass: 'ksaqzndrucddszzc'
        // pass: 'tccfbkaovnenkprn'
    }
});
// user: 'antopolis.dev@gmail.com',
// pass: 'ksaqzndrucddszzc'

// module.exports = async (senderAddress,link)=>{
//     let error =false;
//     try{
//         await transporter.sendMail({
//             from: '"Sheeyam Bro 👻" <sheeyam@gmail.com>', // sender address
//             to: senderAddress, // list of receivers
//             subject: "Verify Email ✔", // Subject line
//             html: `Click <a href="${link}">Here</a><br> Valied For 1Hour`, // html body
//         });
//     }catch(e){
//         error = true;
//     }
//     return error;
// }

module.exports = {
    sendVerificationEmail: async (senderAddress,link)=>{
        let error =false;
        try{
            await transporter.sendMail({
                from: '"Sheeyam Bro 👻" <sheeyam@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "Verify Email ✔", // Subject line
                html: `Click <a href="${link}">Here</a><br> Valied For 12Hour`, // html body
            });
        }catch(e){
            error = true;
        }
        return error;
    },

    sendForgotPasswordEmail: async (senderAddress, link)=>{
        let error =false;
        try{
            await transporter.sendMail({
                from: '"Sheeyam Bro 👻" <sheeyam@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "Reset Password ✔", // Subject line
                html: `Reset Your Password By Clicking <a href="${link}">Here</a><br> Valied For 1Hour`, // html body
            });
        }catch(e){
            error = true;
        }
        return error;
    },

    sendEmployeeVerificationEmail: async (senderAddress,link)=>{
        let error =false;
        try{
            await transporter.sendMail({
                from: '"Sheeyam Bro 👻" <sheeyam@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "Employee Verify Email ✔", // Subject line
                html: `Click <a href="${link}">Here</a><br> Valied For 12Hour`, // html body
            });
        }catch(e){
            error = true;
        }
        return error;
    },
}