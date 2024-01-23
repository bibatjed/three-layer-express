import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user";
import initializeApplication from "./app";
import sequelize from "./db";
sequelize
  .authenticate()
  .then(() => {
    const app = initializeApplication(userRouter);

    app.listen(3000, () => {
      console.log("listening");
    });
  })
  .catch((err) => {
    console.error(err);
  });
