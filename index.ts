import bodyParser from 'body-parser';
import express from 'express';
import { ConfigurationManager } from './Config';
import { ApplicationConfigurationModel, ConfigurationTypesEnum } from './Models';
import { DbHelper } from './Utilities';
const startAsync = async () => {
    const APP = express();
    // parse application/x-www-form-urlencoded
    APP.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    APP.use(bodyParser.json())

    const APPLICATION_CONFIGURATION = await new ConfigurationManager().getConfigurationAsync(ConfigurationTypesEnum.ApplicationConfiguration) as ApplicationConfigurationModel;

    APP.get('/',(request, response) => {
        response.status(200).send("Success");
    });

    if(APPLICATION_CONFIGURATION)
    {
        APP.listen(APPLICATION_CONFIGURATION.port,APPLICATION_CONFIGURATION.host,() => console.log(`Server started at http://${APPLICATION_CONFIGURATION.host}:${APPLICATION_CONFIGURATION.port}`));
        const DB_HELPER = new DbHelper();
        DB_HELPER.initDbAsync();
    }
    else
    {
        process.exit(1);
    }
}

startAsync();