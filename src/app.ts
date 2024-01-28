import express, { Router } from "express";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { swaggerUI, swaggerSpec } from "@src/swagger";
const app = express();

export default function initializeApplication(routes: Router) {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", routes);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use(errorHandler);
  return app;
}
