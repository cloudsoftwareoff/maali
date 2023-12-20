const nodemailer = require('nodemailer');

const sendEmail = async (receipt,code) => {
  try {
    // Create a transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: receipt, 
      subject: 'Code de Confirmation',
      text: `compte créé, utilisez ce code pour vérifier!\n\nCode: ${code}\n\n`,
    
    
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
