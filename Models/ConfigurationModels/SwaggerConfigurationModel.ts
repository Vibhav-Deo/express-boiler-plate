export interface SwaggerConfigurationModel {
    swaggerDefinition: SwaggerDefinitionModel,
    apis: Array<string>
}

interface SwaggerDefinitionModel {
    info: SwaggerInfoModel
}

interface SwaggerInfoModel {
    version: string,
    title: string,
    description: string
    contact: {
        name: string
    },
    servers: Array<string>
}