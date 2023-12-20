import { Sequelize } from "sequelize";
import { errors } from "../utils/errorDictionary.js";
import  logger  from "../winston.config.js";

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
      logger.info("Succesfully connected to database");
    } catch (error) {
     logger.fatal("Failed to connect to database:  " + error.message);
      throw new errors.DATABASE_CONNECTION_FAILED(error.message);
    }
  }
}
