import MONGOOSE from 'mongoose';
import { setTimeout } from 'timers/promises';
import { ConfigurationManager } from '../Config';
import { ConfigurationTypesEnum, DbConfigurationModel, LogLevelsEnum } from '../Models';
import { Logger } from './Logger';
const debug = require('debug')('app:DBHELPER-->');

export class DbHelper {
    private _logger: Logger;
    
    constructor() {
      this._logger = new Logger()
      
    }
    public async initDbAsync() {
        const CAN_CONNECT = await this.tryConnectionAsync(true);
        console.log(CAN_CONNECT);
        if (CAN_CONNECT && process.env.ENVIRONMENT == 'local') {
            await this.seedDbAsync();
        }
    }

    private async tryConnectionAsync(retryConnection: boolean) {
        let maxRetryAttempts = 10;
        let message: string;
        if (retryConnection) {
            let result = null;
            message = `Max db connection attempts ${maxRetryAttempts}`
            this._logger.log('DB_HELPER', message, LogLevelsEnum.DEFAULT);
            result = await this.canConnectToDBAsync();
            if (result) {
                return result;
            } else {
                message = 'Error connecting to db trying again in 10 secs';
                this._logger.log('DB_HELPER', message, LogLevelsEnum.DEFAULT);
                for (let attempt = 0; attempt <= maxRetryAttempts; attempt++) {
                  message = `Trying Db connection attempt ${attempt}`
                  this._logger.log('DB_HELPER', message, LogLevelsEnum.DEFAULT);
                  await setTimeout(10000);
                  result = await this.canConnectToDBAsync();
                  if (result) {
                    break;
                  }
                }
                return result;
            }
        } else {
            return await this.canConnectToDBAsync();
        }
    }

    private async getConnectionStringAsync() {
        const DB_CONFIGURATION = await new ConfigurationManager().getConfigurationAsync(ConfigurationTypesEnum.DbConfiguration) as DbConfigurationModel;
        const CONNECTOPN_STRING = `${DB_CONFIGURATION.adapter}://${DB_CONFIGURATION.host}:${DB_CONFIGURATION.port}/${DB_CONFIGURATION.dbName}`;
        return CONNECTOPN_STRING;
      }

    private async canConnectToDBAsync() {
        try {
          const connectionString = await this.getConnectionStringAsync();
          await MONGOOSE.connect(connectionString,{authSource:process.env.AUTH_SOURCE,user:process.env.DB_USER,pass:process.env.DB_PASSWORD});
          return true;
        } catch (error) {
          debug(error);
          return false;
        }
    }

    private async seedDbAsync() {
        //const data = require('../SeedData/seedData').data;
        try {
          const RESULT = await this.insertDataAsync();
          if (RESULT) {
            this._logger.log('DB_HELPER', 'Data insert complete', LogLevelsEnum.DEFAULT);
          } else {
            this._logger.log('DB_HELPER', 'There was some problem inserting seed data', LogLevelsEnum.DEFAULT);
          }
        } catch (error) {
          this._logger.log('DB_HELPER', error, LogLevelsEnum.ERROR);
        }
      };
      
      
      private async insertDataAsync() {
        //Add logic to insert seed data
        try{
          return true;
        }
        catch(error) {
          debug(error);
          throw error;
        }
      }
}
