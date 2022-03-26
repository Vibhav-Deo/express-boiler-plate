import bodyParser from 'body-parser';
import express from 'express';
import { ConfigurationManager } from './Config';
import { ApplicationConfigurationModel, ConfigurationTypesEnum, LogLevelsEnum, SwaggerConfigurationModel } from './Models';
import { DbHelper, Logger } from './Utilities';

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ROUTES } from './Routes';

const startAsync = async () => {
    const APP = express();
    //Init Confirguration Manager
    const CONFIGURATION_MANAGER = new ConfigurationManager();
    //MIDDLEWARES
    APP.use((req, res, next) => {
        const LOGGER = new Logger();
        //TODO: Find how to log response body
        const data = {'URI':req.url,'Body':req.body,'Params':req.params,'Query':req.query,'Status':res.statusCode}
        LOGGER.log('Request',data,LogLevelsEnum.INFO);
        next();
      });
    // parse application/x-www-form-urlencoded
    APP.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    APP.use(bodyParser.json())
    
    APP.use('/api',...ROUTES)
    //Set up swagger
    const SWAGGER_CONFIG = CONFIGURATION_MANAGER.getSwaggerConfiguration() as SwaggerConfigurationModel;
    const SWAGGER_DOCS = swaggerJsDoc(SWAGGER_CONFIG);
    APP.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SWAGGER_DOCS));
    
    //Init application configuration
    const APPLICATION_CONFIGURATION = await CONFIGURATION_MANAGER.getConfigurationAsync(ConfigurationTypesEnum.ApplicationConfiguration) as ApplicationConfigurationModel;
    if(APPLICATION_CONFIGURATION)
    {
        const DB_HELPER = new DbHelper();
        await DB_HELPER.initDbAsync();
        APP.listen(APPLICATION_CONFIGURATION.port,APPLICATION_CONFIGURATION.host,() => console.log(`Server started at http://${APPLICATION_CONFIGURATION.host}:${APPLICATION_CONFIGURATION.port}`));
    }
    else
    {
        process.exit(1);
    }
}

startAsync();
