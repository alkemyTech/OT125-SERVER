const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const ejs = require("ejs");


// const welcomeTemplate = require('../views/');

module.exports.welcomeEmail = async (user) =>{
    const orgRepo = require('../repositories/organization')
    const {response:{data}} = await orgRepo.getOneOrg();
    const welcomeTemplate = await ejs.renderFile("views/welcomeTemplate.ejs",{user:user,org:data})
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
        console.log('ErrorMailService:',e.message)
    }
} 

module.exports.formReceivedEmail = async (contact) =>{
    const orgRepo = require('../repositories/organization')
    const {response:{data}} = await orgRepo.getOneOrg();
    const formReceivedTemplate = await ejs.renderFile("views/formReceivedTemplate.ejs",{contact:contact,org:data})
    const msg = {
        to: contact.email, 
        from: process.env.MAIL_ADMIN, 
        subject: 'Gracias por escribirnos',
        html: `${formReceivedTemplate}`
    }
    try{
        await sgMail.send(msg)
        console.log('Received a new ContactForm. Confirmation email was sent. ')
    } 
    catch(e){
        console.log('ErrorMailService:',e.message)
    }
} 

