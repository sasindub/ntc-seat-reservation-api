import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with details such as name, email, password, and role.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: securepassword
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               role:
 *                 type: string
 *                 enum: [admin, commuter, bus_operator]
 *                 example: commuter
 *               mobileNo:
 *                 type: string
 *                 example: 1234567890
 *               NIC:
 *                 type: string
 *                 example: 123456789V
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerUser);

export default router;
