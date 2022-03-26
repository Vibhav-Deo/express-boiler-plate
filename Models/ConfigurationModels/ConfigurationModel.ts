import { ApplicationConfigurationModel } from "./ApplicationConfigurationModel";
import { DbConfigurationModel } from "./DbConfigurationModel";
import { SwaggerConfigurationModel } from "./SwaggerConfigurationModel";

export interface ConfigurationModel {
    applicationConfiguration: ApplicationConfigurationModel,
    dbConfiguration: DbConfigurationModel,
    swaggerConfiguration: SwaggerConfigurationModel
}