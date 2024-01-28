import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API with documentation",
    version: "1.0.0",
  },
  securityDefinitions: {
    CookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "refreshToken",
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUI };
