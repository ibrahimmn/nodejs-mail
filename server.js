const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require('path');
const dotenv=require('dotenv'); // Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(bodyParser.json());

const emailFrom = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailFrom,
    pass: emailPassword,
  },
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: emailFrom,
      to: 'recipient@example.com', // Replace with the recipient's email address
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error: Unable to send the email.');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully.');
      }
    });
  });

 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});