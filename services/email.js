const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


module.exports.welcomeEmail = async (user) =>{
    console.log(user);
    
    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.MAIL_ADMIN, // Change to your verified sender
        subject: 'Welcome',
        html: '<h3>Welcome</h3>'
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