import bcrypt from "bcryptjs";
import User from "../models/User.js";
import transporter from "../config/mail.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      role,
      mobileNo,
      NIC,
      address,
    } = req.body;

    // Validation for required fields
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !email ||
      !mobileNo ||
      !NIC ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Validate mobile number (10 digits only)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      return res.status(400).json({
        message: "Mobile number must be 10 digits long.",
      });
    }

    // Validate NIC (10 digits with 'V' or 12 digits only)
    const nicRegex = /^(\d{9}[vV]|\d{12})$/;
    if (!nicRegex.test(NIC)) {
      return res.status(400).json({
        message: "NIC must be 12 digits or 10 digits followed by 'V' or 'v'.",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      isReset: false, // default reset is false
      email,
      role,
      mobileNo,
      NIC,
      address,
      createdDate: new Date(),
    });

    // Send an email only if the user is not admin
    if (role.toLowerCase() !== "admin") {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Welcome to the System",
        text: `Hi ${firstName},\n\nWelcome to our system! Your account has been created successfully.\n\nBest regards,\nTeam`,
      };

      await transporter.sendMail(mailOptions);
    }

    // Save the user
    await newUser.save();

    res.status(201).json({
      message:
        "User registered successfully. A confirmation email has been sent.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Something went wrong. Please try again later. ${error}` });
  }
};
