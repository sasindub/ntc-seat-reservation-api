import express from "express";
import { loginUser } from "../controllers/authController.js";
import { authenticateToken, authorizeRole } from "../middlewares/authmiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       401:
 *         description: Unauthorized (Invalid credentials)
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Access admin-only route
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome message for admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome, Admin!
 *       403:
 *         description: Forbidden (Role not authorized)
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 */
router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

/**
 * @swagger
 * /api/auth/commuter:
 *   get:
 *     summary: Access commuter-only route
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome message for commuter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome, Commuter!
 *       403:
 *         description: Forbidden (Role not authorized)
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 */
router.get("/commuter", authenticateToken, authorizeRole("commuter"), (req, res) => {
  res.status(200).json({ message: "Welcome, Commuter!" });
});

export default router;
