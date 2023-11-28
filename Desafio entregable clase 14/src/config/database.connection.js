import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const DB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.DB_URI_TEST
    : process.env.DB_URI;

async function databaseConnection() {
  await mongoose
    .connect(process.env.DB_URI)
    .then((res) => {
      console.log("Succesfully connected to database");
    })
    .catch((err) => {
      throw new Error(`Connection to database failed, ERROR: ${err.message}`);
    });
}

//exports
export default databaseConnection;
