import bodyParser from "body-parser";
import { ConfigurationManager } from "../Config";
import { SwaggerConfigurationModel, LogLevelsEnum } from "../Models";
import { Logger } from "../Utilities";
import { Express } from 'express-serve-static-core';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export class Middleware {
    async setUpSwaggerMiddlewareAsync(CONFIGURATION_MANAGER: ConfigurationManager, APP: Express) {
        const SWAGGER_CONFIG = CONFIGURATION_MANAGER.getSwaggerConfiguration() as SwaggerConfigurationModel;
        const SWAGGER_DOCS = swaggerJsDoc(SWAGGER_CONFIG);
        APP.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SWAGGER_DOCS));
    }
    
    async setUpBodyParserMiddlewareAsync(APP: Express) {
        // parse application/x-www-form-urlencoded
        APP.use(bodyParser.urlencoded({ extended: false }));
    
        // parse application/json
        APP.use(bodyParser.json());
    }
    
    async setUpLoggingMiddlewareAsync(APP: Express) {
        APP.use((req, res, next) => {
            const LOGGER = new Logger();
            //TODO: Find how to log response body
            const data = { 'URI': req.url, 'Body': req.body, 'Params': req.params, 'Query': req.query, 'Status': res.statusCode };
            LOGGER.log('Request', data, LogLevelsEnum.INFO);
            next();
        });
    }

    public async setUpMiddlewareAsync(APP: Express, CONFIGURATION_MANAGER: ConfigurationManager) {
        await this.setUpLoggingMiddlewareAsync(APP);
        await this.setUpBodyParserMiddlewareAsync(APP);
        await this.setUpSwaggerMiddlewareAsync(CONFIGURATION_MANAGER, APP);
    }
}