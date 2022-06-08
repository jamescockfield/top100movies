import { ValidatedResponseData } from "../types/responses/ValidatedResponseData";

export interface ResponseValidator {
    validate(responseData: object): ValidatedResponseData;
}
