import Joi from "joi";

const adminValidator = {}

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

adminValidator.login = Joi.object().keys({
    admin_id,
    signature
});

export default adminValidator;