import bcrypt from "bcryptjs";
import User from "../models/User.js";
import transporter from "../config/mail.js";

//register user
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

//delete user
export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  };


  //update user
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Validate NIC, email, and mobile number if provided
      if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
  
      if (updateData.mobileNo && !/^\d{10}$/.test(updateData.mobileNo)) {
        return res.status(400).json({ message: "Mobile number must be 10 digits." });
      }
  
      if (updateData.NIC && !/^(\d{9}[vV]|\d{12})$/.test(updateData.NIC)) {
        return res.status(400).json({
          message: "NIC must be 12 digits or 10 digits followed by 'V' or 'v'.",
        });
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true, // Return updated document
        runValidators: true, // Ensure schema validations are run
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User updated successfully.", data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  };
  
  


