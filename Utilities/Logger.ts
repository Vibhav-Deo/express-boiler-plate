import { LogLevelsEnum } from "../Models";

export class Logger {
    private ENVIRONMENT = process.env.ENVIRONMENT

    public async log(prefix: string, data: any, level: LogLevelsEnum = LogLevelsEnum.DEFAULT)
    {
        if(this.ENVIRONMENT?.toLowerCase() == 'local')
        {
            const DEBUG = require('debug')(prefix.toUpperCase());
            DEBUG(data);
        }
        else {
            const jsonData = JSON.stringify(data);
            switch(level)
            {
                default: console.log(prefix.toUpperCase(),' LOG - ', jsonData);
                                            break;
                case LogLevelsEnum.INFO: console.info(prefix.toUpperCase(),' INFO - ', jsonData);
                                            break;
                case LogLevelsEnum.WARN: console.warn(prefix.toUpperCase(),' WARN - ', jsonData);
                                            break;
                case LogLevelsEnum.ERROR: console.error(prefix.toUpperCase(),' ERROR - ', jsonData);
                                            break;
            }
        }
    }
}