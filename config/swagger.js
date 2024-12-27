import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NTC Seat Reservation API",
      version: "1.0.0",
      description: "API documentation for NTC Seat Reservation system",
    },
    servers: [
      {
        url: "http://localhost:5000", // Base URL of the API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, specifies the format of the token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply Bearer Token globally if needed
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files for API documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
