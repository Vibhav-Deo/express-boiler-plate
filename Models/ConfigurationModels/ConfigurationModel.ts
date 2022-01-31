import { ApplicationConfigurationModel } from "./ApplicationConfigurationModel";
import { DbConfigurationModel } from "./DbConfigurationModel";

export interface ConfigurationModel {
    applicationConfiguration: ApplicationConfigurationModel,
    dbConfiguration: DbConfigurationModel
}