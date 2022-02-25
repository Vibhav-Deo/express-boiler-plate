import { ConfigurationModel, ConfigurationTypesEnum } from "../Models";
import 'dotenv/config';
export class ConfigurationManager {
    private _configuration: ConfigurationModel;

    public async getConfigurationAsync(configurationType: ConfigurationTypesEnum) {
        if(configurationType)
        {
            switch(configurationType)
            {
                case ConfigurationTypesEnum.ApplicationConfiguration: return this._configuration.applicationConfiguration;
                case ConfigurationTypesEnum.DbConfiguration: return this._configuration.dbConfiguration;
                    
            }
        }
        else
        {
            throw new Error('Configuration type cannot be null')
        }
    }

    constructor() {
        const configuration: ConfigurationModel = {
            applicationConfiguration: {
                port: Number(process.env.PORT),
                host: String(process.env.HOST),
                applicationName: String(process.env.APPLICATION_NAME)
            },
            dbConfiguration: {
                adapter: String(process.env.ADAPTER),
                userName: String(process.env.DB_USER),
                password: String(process.env.DB_PASSWORD),
                host: String(process.env.DB_HOST),
                port: Number(process.env.DB_PORT),
                dbName: String(process.env.DB_NAME)
            }
        };
        this._configuration = configuration;
    }
}