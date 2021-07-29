import Joi from "joi";

const roleValidator = {}

const name = Joi.string().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be an empty`,
    "any.required": `name is required`
});

const description = Joi.string().required().messages({
    "string.base": `description must be a string`,
    "string.empty": `description cannot be an empty`,
    "any.required": `description is required`
});

const role_id = Joi.string().required().messages({
    "string.base": `role_id must be a string`,
    "string.empty": `role_id cannot be an empty`,
    "any.required": `role_id is required`
});

roleValidator.add = Joi.object().keys({
    name,
    description
});

roleValidator.update = Joi.object().keys({
    role_id,
    name,
    description
});

roleValidator.delete = Joi.object().keys({
    role_id
});

export default roleValidator;