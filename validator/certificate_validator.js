import Joi from "joi";

const certificateValidator = {}

const admin_id = Joi.string().required().messages({
    "string.base": `admin_id must be a string`,
    "string.empty": `admin_id cannot be an empty`,
    "any.required": `admin_id is required`
});

const user_id = Joi.string().required().messages({
    "string.base": `user_id must be a string`,
    "string.empty": `user_id cannot be an empty`,
    "any.required": `user_id is required`
});

const name = Joi.string().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be an empty`,
    "any.required": `name is required`
});

const sc_address = Joi.string().required().messages({
    "string.base": `sc_address must be a string`,
    "string.empty": `sc_address cannot be an empty`,
    "any.required": `sc_address is required`
});

const no = Joi.string().required().messages({
    "string.base": `no must be a string`,
    "string.empty": `no cannot be an empty`,
    "any.required": `no is required`
});

const title = Joi.string().required().messages({
    "string.base": `title must be a string`,
    "string.empty": `title cannot be an empty`,
    "any.required": `title is required`
});

const description = Joi.string().required().messages({
    "string.base": `description must be a string`,
    "string.empty": `description cannot be an empty`,
    "any.required": `description is required`
});

const score = Joi.string().required().messages({
    "string.base": `score must be a string`,
    "string.empty": `score cannot be an empty`,
    "any.required": `score is required`
});

const date = Joi.string().required().messages({
    "string.base": `date must be a string`,
    "string.empty": `date cannot be an empty`,
    "any.required": `date is required`
});

certificateValidator.add = Joi.object().keys({
    user_id,
    admin_id,
    sc_address,
    name,
    no,
    title,
    description,
    score,
    date
});

export default certificateValidator;