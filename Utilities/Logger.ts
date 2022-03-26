import { LogLevelsEnum } from "../Models";
import Debug from 'debug';
export class Logger {
    private ENVIRONMENT = process.env.ENVIRONMENT

    public async log(prefix: string, data: any, level: LogLevelsEnum = LogLevelsEnum.DEFAULT)
    {

        const jsonData = JSON.stringify(data);
        if(this.ENVIRONMENT?.toLowerCase() == 'local')
        {
            //console.log('Here')
            const DEBUG = Debug(`SERVER:${prefix.toUpperCase()}`);
            DEBUG(data);
        }
        else {
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