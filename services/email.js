const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const ejs = require("ejs");

// const welcomeTemplate = require('../views/');

module.exports.welcomeEmail = async (user) =>{

    var welcomeTemplate = await ejs.renderFile("views/welcomeTemplate.ejs")

    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.MAIL_ADMIN, // Change to your verified sender
        subject: 'Welcome',
        html: `${welcomeTemplate}`
    }
    try{
        await sgMail.send(msg)
        console.log('Email sent successfully')
    } 
    catch(e){
        errJSON = handleError(e);
        return res
        .status(errJSON.statusCode)
        .json({ errors: [{ msg: errJSON.errMessage }] });
    }
} 