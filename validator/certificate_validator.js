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

const certificate_type_id = Joi.string().required().messages({
    "string.base": `certificate_type_id must be a string`,
    "string.empty": `certificate_type_id cannot be an empty`,
    "any.required": `certificate_type_id is required`
});

const logo = Joi.string().allow(null).required().messages({
    "string.base": `logo must be a string`,
    "string.empty": `logo cannot be an empty`,
    "any.required": `logo is required`
});

const name = Joi.string().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be an empty`,
    "any.required": `name is required`
});

const receiver_name = Joi.string().required().messages({
    "string.base": `receiver_name must be a string`,
    "string.empty": `receiver_name cannot be an empty`,
    "any.required": `receiver_name is required`
});

const sc_address = Joi.string().required().messages({
    "string.base": `sc_address must be a string`,
    "string.empty": `sc_address cannot be an empty`,
    "any.required": `sc_address is required`
});

const token_id = Joi.string().required().messages({
    "string.base": `token_id must be a string`,
    "string.empty": `token_id cannot be an empty`,
    "any.required": `token_id is required`
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

const is_accepted = Joi.string().required().messages({
    "string.base": `is_accepted must be a string`,
    "string.empty": `is_accepted cannot be an empty`,
    "any.required": `is_accepted is required`
});

const date = Joi.string().required().messages({
    "string.base": `date must be a string`,
    "string.empty": `date cannot be an empty`,
    "any.required": `date is required`
});

const certificate_id = Joi.string().required().messages({
    "string.base": `certificate_id must be a string`,
    "string.empty": `certificate_id cannot be an empty`,
    "any.required": `certificate_id is required`
});

const priority = Joi.number().required().messages({
    "number.base": `priority must be a number`,
    "any.required": `priority is required`
});

const status = Joi.number().required().messages({
    "number.base": `status must be a number`,
    "any.required": `status is required`
});

const certificate_signer = Joi.object().keys({
    user_id,
    priority
});

certificateValidator.add = Joi.object().keys({
    user_id,
    admin_id,
    receiver_name,
    logo,
    sc_address,
    token_id,
    name,
    no,
    title,
    description,
    score,
    date,
    certificate_type_id,
    certificate_signers: Joi.array().items(certificate_signer).min(1)
        .required().messages({
            "array.base": `certificate_signers must be json array`,
            "array.min": `certificate_signers must include minimum one object`,
            "any.required": `certificate_signers is required`
        })
});

certificateValidator.update = Joi.object().keys({
    certificate_id,
    user_id,
    admin_id,
    receiver_name,
    logo,
    sc_address,
    token_id,
    name,
    no,
    title,
    description,
    score,
    date,
    is_accepted,
    certificate_type_id,
    status
});

certificateValidator.sign = Joi.object().keys({
    user_id,
    certificate_id
});

export default certificateValidator;