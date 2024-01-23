import { Sequelize } from "sequelize";
const connectionString = process.env.DB_CONNECTION;
if (!connectionString) {
  throw new Error("connection string is undefined");
}
const sequelize = new Sequelize(connectionString, {
  dialect: "mysql",
});

export default sequelize;
