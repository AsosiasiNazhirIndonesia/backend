import Joi from "joi";
import { ADMIN_ROLE } from "../constant/admin_role";

const adminValidator = {}

const name = Joi.string().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be an empty`,
    "any.required": `name is required`
});

const photo = Joi.string().allow(null).required().messages({
    "string.base": `photo must be a string`,
    "string.empty": `photo cannot be an empty`,
    "any.required": `photo is required`
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

const admin_role = Joi.string().valid(...Object.keys(ADMIN_ROLE)).required().messages({
    "any.only": `admin_role invalid`,
    "string.empty": `admin_role cannot be an empty`,
    "any.required": `admin_role is required`
});

const public_key = Joi.string().required().messages({
    "string.base": `public_key must be a string`,
    "string.empty": `public_key cannot be an empty`,
    "any.required": `public_key is required`
});

const admin_id = Joi.string().required().messages({
    "string.base": `admin_id must be a string`,
    "string.empty": `admin_id cannot be an empty`,
    "any.required": `admin_id is required`
});

const signature = Joi.string().required().messages({
    "string.base": `signature must be a string`,
    "string.empty": `signature cannot be an empty`,
    "any.required": `signature is required`
});

const institution_id = Joi.string().allow(null).required().messages({
    "string.base": `institution_id must be a string`,
    "string.empty": `institution_id cannot be an empty`,
    "any.required": `institution_id is required`
});

adminValidator.add = Joi.object().keys({
    admin_id,
    name,
    photo,
    email,
    phone_number,
    admin_role,
    public_key,
    institution_id
});

adminValidator.update = Joi.object().keys({
    admin_id,
    name,
    photo,
    email,
    phone_number,
    admin_role,
    public_key,
    institution_id
});

adminValidator.login = Joi.object().keys({
    admin_id,
    signature
});

export default adminValidator;