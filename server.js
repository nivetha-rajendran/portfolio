// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Send email using Resend API
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // or use your verified domain
      to: process.env.RECEIVER_EMAIL || "nivetha.rabs@gmail.com",
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    console.log("Email sent:", data);
    return res.status(200).json({ message: "Email sent successfully 🚀" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
