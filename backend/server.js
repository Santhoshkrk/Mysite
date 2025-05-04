// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to send email
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,  // ✅ Loaded from .env
      pass: process.env.EMAIL_PASS,  // ✅ Loaded from .env
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,     // ✅ Receiver email from .env
      subject: `New message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Start server
app.listen(PORT, () => {
  const ifaces = os.networkInterfaces();
  const localIP = Object.values(ifaces)
    .flat()
    .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address;

  console.log(`Server is running at http://${localIP}:${PORT}`);
});

