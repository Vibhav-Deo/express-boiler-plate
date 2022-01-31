import MONGOOSE from 'mongoose';
import { setTimeout } from 'timers/promises';
import { ConfigurationManager } from '../Config';
import { ConfigurationTypesEnum, DbConfigurationModel } from '../Models';
const debug = require('debug')('app:DBHELPER-->');

export class DbHelper {
    public async initDbAsync() {
        const CAN_CONNECT = await this.tryConnectionAsync(true);
        if (CAN_CONNECT && process.env.ENVIRONMENT == 'local') {
            await this.seedDbAsync();
        }
    }

    private async tryConnectionAsync(retryConnection: boolean) {
        let maxRetryAttempts = 10;
        if (retryConnection) {
            let result = null;
            debug('Max db connection attempts ', maxRetryAttempts);
            result = await this.canConnectToDBAsync();
            if (result) {
                return result;
            } else {
                debug('Error connecting to db trying again in 10 secs');
                for (let attempt = 0; attempt <= maxRetryAttempts; attempt++) {
                    debug('Trying Db connection attempt ', attempt);
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
        debug('InSeed');
        //const data = require('../SeedData/seedData').data;
        try {
          const RESULT = await this.insertDataAsync();
          if (RESULT) {
            debug('Data insert complete');
          } else {
            debug('There was some problem inserting seed data');
          }
        } catch (error) {
          debug(error);
        }
      };
      
      
      private async insertDataAsync() {
        try{
          return true;
        }
        catch(error) {
          debug(error);
          throw error;
        }
      }
}
