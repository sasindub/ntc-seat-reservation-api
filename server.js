import express from "express";
import { swaggerUi, swaggerDocs } from "./config/swagger.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";  // Import the new auth router

dotenv.config();

const app = express();

app.use(express.json());

import transporter from "./config/mail.js";


// const mailOptions = {
//   from: process.env.EMAIL,
//   to: "sasindulakshithabandara@gmail.com",
//   subject: "Test Email",
//   text: "This is a test email from Nodemailer.",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email:", error);
//   } else {
//     console.log("Email sent:", info.response);
//   }
// });



// Routes
app.use("/api/users", userRoutes);

// Simple Home Route
app.get("/", (req, res) => {
  res.send("Hello, Server is running!");
});

console.log(process.env.MONGO_URI);

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
