import { PresenceMode } from "joi";

import { ResponseValidator as ResponseValidatorInterface } from "../../domain/interfaces/ResponseValidator";

import { ValidatedResponseData } from "../../domain/types/responses/ValidatedResponseData";

export abstract class ResponseValidator implements ResponseValidatorInterface {
    protected validateOptions = {
        stripUnknown: true,
        presence: "required" as PresenceMode,
        convert: false,
    };

    public abstract validate(responseData: object): ValidatedResponseData;
}
