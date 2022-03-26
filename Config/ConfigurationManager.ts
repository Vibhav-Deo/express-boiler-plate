import { ConfigurationModel, ConfigurationTypesEnum, SwaggerConfigurationModel } from "../Models";
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
                case ConfigurationTypesEnum.SwaggerConfiguration: return this._configuration.swaggerConfiguration
                    
            }
        }
        else
        {
            throw new Error('Configuration type cannot be null')
        }
    }
    getSwaggerConfiguration() {
        return {
            swaggerDefinition: {
                info: {
                    version: "1.0.0",
                    title: "Backend",
                    description: "Backend API Information",
                    contact: {
                        name: "Vibhav Deo"
                    },
                    servers: ["http://0.0.0.0:8000"]
                }
            },
            // ['.routes/*.js']
            apis: ["./Routes/*/*/*.js"]
        } as SwaggerConfigurationModel
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
            },
            swaggerConfiguration: this.getSwaggerConfiguration()
        };
        this._configuration = configuration;
    }
}