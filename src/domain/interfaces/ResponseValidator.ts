import joi from "@hapi/joi"; // TODO: if we manually define types, we should upgrade to regular 'joi' package
import "joi-extract-type"; // TODO: consider removing and just manually defining types

export interface ResponseValidator {
    validate(responseData: object): joi.extractMap<joi.mappedSchemaMap>;
}
