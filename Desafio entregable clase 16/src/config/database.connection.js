import { Sequelize } from "sequelize";
import { CustomError } from "../utils.js";

export class Database {
  static instanceDatabase;

  static getInstanceDatabase(database = Sequelize) {
    if (!this.instanceDatabase) {
      this.instanceDatabase = new database(process.env.DATABASE_URL);
    }

    return this.instanceDatabase;
  }

  static async databaseConnection() {
    try {
      await this.getInstanceDatabase().authenticate();
      //await this.getInstanceDatabase().sync({alter:true}); 
      console.log("Succesfully connected to database");
    } catch (error) {
      throw new CustomError(
        500,
        `Connection to database failed, ERROR: ${error.message}`
      );
    }
  }
}
