const nodemailer = require("nodemailer");
const ContactModel = require("../models/contact");

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

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
    return res.status(500).json({ error: "Failed to save email data" });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ankit101joshi@gmail.com",
      pass: "Jos@81260411",
    },
  });

  const mailOptions = {
    from: email,
    to: "ankit101joshi@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to send the email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ message: "Email sent successfully" });
    }
  });
};
