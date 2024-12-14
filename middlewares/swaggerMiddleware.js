const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerMiddleware = (app, port) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Bosta Books Express API",
        version: "1.0",
        description:
          "This is a simple Book API application made with Express and documented with Swagger",  
      },
      servers: [
        {
          url: `http://localhost:${port}/`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", 
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js"], 
  };

  const specs = swaggerJsdoc(options);

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerMiddleware;