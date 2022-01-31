import { Response } from "express";
import { ApiResponseModel, CustomErrorModel } from "../Models";

export class UniversalFunctions {
    public async sendSuccessAsync(response: Response, data: ApiResponseModel) {
        return response.status(data.statusCode).send(data);
    }
    public async sendErrorAsync(response: Response, error: Error, customError: CustomErrorModel | null) {
        if(customError) {
            return response.status(customError.statusCode).send(customError);
        }
        else {
            return response.status(500).send(error.message);
        }
    }
}