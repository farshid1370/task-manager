const sgEmail = require('@sendgrid/mail')
sgEmail.setApiKey(process.env.EMAIL_API_KEY)
const sendWelcomeEmail = (email, firstname, lastname) => {
    sgEmail.send({
        to: email,
        from: 'farshid.amirkhani@gmail.com',
        subject: 'Welcome to task manager',
        text: `Hellow ${firstname} ${lastname}. Welcome to task manager app.`
    })
}

const sendCancelationEmail = (email, firstname, lastname) => {
    sgEmail.send({
        to: email,
        from: 'farshid.amirkhani@gmail.com',
        subject: 'Sorry to see go!',
        text: `Goodby ${firstname} ${lastname}. I hope to see you back sometime soon. `
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}