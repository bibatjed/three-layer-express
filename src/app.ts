import express, { Router } from "express";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { swaggerUI, swaggerSpec } from "@src/swagger";
import rTracer from "cls-rtracer";
import initializeMorganMiddleware from "./middleware/morganMiddleware";
const app = express();

export default function initializeApplication(routes: Router) {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(rTracer.expressMiddleware());
  app.use(initializeMorganMiddleware());

  app.use("/", routes);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use(errorHandler);
  return app;
}
