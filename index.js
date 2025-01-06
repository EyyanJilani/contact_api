const express = require("express");
const nodemailer = require("nodemailer");
// require("dotenv").config();

const app = express();
const port = 5001;
const cors = require("cors");
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "joeegbert3@gmail.com", // Use environment variables for security
    pass: "agbk vpge vamm gbld",
  },
});

// Middleware to parse JSON
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// API to handle contact form submission
app.post("/api/contactForm", async (req, res) => {
  const { name, email, contact, message } = req.body;

  // if (!name || !email || !contact || !message) {
  //   return res.status(400).json({ error: "All fields are required." });
  // }

  try {
    const mailOptions = {
      from: email,
      to: ["ayyancatalyst@gmail.com"], // Multiple recipients
      subject: "New Contact Form Submission",
      text: `🚨 New Contact Form Submission 🚨\n\nYou have received a new message from *${name}* (${contact}) on your website.\n\n🔹 *Email:* ${email}\n🔹 *Message:* \n"${message}"\n\nPlease review the submission and follow up accordingly.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ error: "Error sending email. Please try again later." });
      }
      res.status(200).json({ message: "Contact form submitted successfully!" });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


