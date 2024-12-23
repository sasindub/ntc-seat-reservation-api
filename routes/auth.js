import { Router } from "express";
import User from "../models/User.js"; // Ensure this is the correct path to your User model
const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - password
 *               - NIC
 *               - mobileNo
 *               - email
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               NIC:
 *                 type: string
 *               mobileNo:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *                 default: null
 *               role:
 *                 type: string
 *                 enum: ["admin", "commuter", "bus_operator"]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, password, NIC, mobileNo, email, address, role } = req.body;

    // Perform validation if necessary
    if (!firstName || !lastName || !username || !password || !NIC || !mobileNo || !email || !role) {
      return res.status(400).send("Missing required fields.");
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      username,
      password,
      NIC,
      mobileNo,
      email,
      address, // Optional field
      role,
    });

    await user.save();

    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
