const nodemailer = require('nodemailer');

const sendEmail = async (receipt, code) => {
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

    // Define the HTML email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: receipt,
      subject: 'Code de Confirmation',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #007bff;
                color: #fff;
                padding: 10px;
                border-radius: 5px 5px 0 0;
              }
              .content {
                padding: 20px;
                color: #333;
              }
              .code {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
              }
              .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #888;
              }
              .footer a {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h3>Code de Confirmation</h3>
              </div>
              <div class="content">
                <p> Utilisez le code suivant pour vérifier :</p>
                <p class="code">${code}</p>
              </div>
              <div class="footer">
                
                <p>Contactez-nous: contact@maalivote.online</p>
                <p><a href='https://maalivote.online'>Visiter nous</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
