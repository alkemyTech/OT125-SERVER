const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendContactEmail = async(user) => {
    const messageMail = {
        to: user.email,
        from: {
            name: 'Somos Mas ONG Welcome Contact',
            email: process.env.MAIL_ADMIN,
        },
        subject: 'Register Contact ONG',
        text: 'Thanks for register as contact',
        html: '<h1> Welcome as contact in the Organization<h1>'
    }
    sgMail.send(messageMail)
        .then(response => console.log('Contact mail sent..'))
        .catch(error => console.log(error))
};