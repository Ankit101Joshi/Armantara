

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");



// Schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", contactSchema);

// Middleware to parse request body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Contact form endpoint
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Save the email data in MongoDB
  const contactData = new ContactModel({
    name,
    email,
    message,
  });

  try {
    await contactData.save();
    console.log("Email data saved in MongoDB");
  } catch (error) {
    console.error("Error saving email data:", error);
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ankit101@gmail.com",
      pass: "Jos@8077344",
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: "ankit101@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send the email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

module.exports = router;
