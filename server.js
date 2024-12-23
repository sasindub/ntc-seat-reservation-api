import express from "express";
import { swaggerUi, swaggerDocs } from "./config/swagger.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/auth.js";  // Import the new auth router

dotenv.config();

const app = express();

app.use(express.json());

//use the routes 

app.use("/api/auth", userRoutes);  // Register the routes under /api/auth

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
