import express from 'express';
import { UniversalFunctions } from '../../../Utilities/UniversalFunctions';
const ROUTER = express.Router();
const UNIVERSAL_FUNCTIONS = new UniversalFunctions();
/**
    * @openapi
    * /api/v1/default:
    *   get:
    *     description: Welcome to swagger-jsdoc!
    *     responses:
    *       200:
    *         description: Returns a success message.
    */
ROUTER.get('/default',(request, response) => {
    UNIVERSAL_FUNCTIONS.sendSuccessAsync(response,{data:null,message:'Success',statusCode:200})
});
export const DefaultRoutes = ROUTER;