import express, { Router } from "express";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
const app = express();

export default function initializeApplication(routes: Router) {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", routes);
  app.use(errorHandler);
  return app;
}
