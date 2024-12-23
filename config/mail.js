import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, 
    },
});

export default transporter;