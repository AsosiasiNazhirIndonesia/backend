import Joi from "joi";
import { INSTITUTION_TYPE } from "../constant/institution_type";

const institutionValidator = {}

const name = Joi.string().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be an empty`,
    "any.required": `name is required`
});

const email = Joi.string().required().messages({
    "string.base": `email must be a string`,
    "string.empty": `email cannot be an empty`,
    "any.required": `email is required`
});

const phone_number = Joi.string().required().messages({
    "string.base": `phone_number must be a string`,
    "string.empty": `phone_number cannot be an empty`,
    "any.required": `phone_number is required`
});

const address = Joi.string().required().messages({
    "string.base": `address must be a string`,
    "string.empty": `address cannot be an empty`,
    "any.required": `address is required`
});

const type = Joi.string().valid(...Object.keys(INSTITUTION_TYPE)).required().messages({
    "any.only": `type invalid`,
    "string.empty": `type cannot be an empty`,
    "any.required": `type is required`
});

const institution_id = Joi.string().required().messages({
    "string.base": `institution_id must be a string`,
    "string.empty": `institution_id cannot be an empty`,
    "any.required": `institution_id is required`
});

const sc_address = Joi.string().required().messages({
    "string.base": `sc_address must be a string`,
    "string.empty": `sc_address cannot be an empty`,
    "any.required": `sc_address is required`
});

institutionValidator.add = Joi.object().keys({
    name,
    email,
    phone_number,
    address,
    type,
    sc_address
});

institutionValidator.update = Joi.object().keys({
    institution_id,
    name,
    email,
    phone_number,
    address,
    type,
    // sc_address
});

institutionValidator.delete = Joi.object().keys({
    institution_id
})

export default institutionValidator;
