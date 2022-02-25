import bodyParser from 'body-parser';
import express from 'express';
import { ConfigurationManager } from './Config';
import { ApplicationConfigurationModel, ConfigurationTypesEnum, LogLevelsEnum } from './Models';
import { DbHelper, Logger } from './Utilities';

const loggingMiddleWare = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const LOGGER = new Logger();
    LOGGER.log('Request',request.body,LogLevelsEnum.INFO);
    next();
}
const startAsync = async () => {
    const APP = express();
    // parse application/x-www-form-urlencoded
    APP.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    APP.use(bodyParser.json())
    
    APP.use(loggingMiddleWare);
    const APPLICATION_CONFIGURATION = await new ConfigurationManager().getConfigurationAsync(ConfigurationTypesEnum.ApplicationConfiguration) as ApplicationConfigurationModel;

    APP.get('/',(request, response) => {
        response.status(200).send("Success");
    });

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