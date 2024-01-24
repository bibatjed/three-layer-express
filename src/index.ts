import dotenv from "dotenv";
dotenv.config();
import router from "./routes";
import initializeApplication from "./app";
import sequelize from "./db";
sequelize
  .authenticate()
  .then(() => {
    const app = initializeApplication(router);

    app.listen(3000, () => {
      console.log("listening");
    });
  })
  .catch((err) => {
    console.error(err);
  });
