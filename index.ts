import express from 'express';
import { ConfigurationManager } from './Config';
import { ApplicationConfigurationModel, ConfigurationTypesEnum, LogLevelsEnum, SwaggerConfigurationModel } from './Models';
import { DbHelper } from './Utilities';
import { ROUTES } from './Routes';
import { Middleware } from './Middlewares/Middleware';

const startAsync = async () => {
    const APP = express();
    
    //Init Confirguration Manager
    const CONFIGURATION_MANAGER = new ConfigurationManager();
    
    //MIDDLEWARES
    const MIDDLEWARE = new Middleware();
    await MIDDLEWARE.setUpMiddlewareAsync(APP, CONFIGURATION_MANAGER)
    
    //ROUTES
    APP.use('/api/v1',...ROUTES)

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


