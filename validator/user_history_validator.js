import Joi from "joi";

const userHistoryValidator = {}

const user_id = Joi.string().required().messages({
    "string.base": `user_id must be a string`,
    "string.empty": `user_id cannot be an empty`,
    "any.required": `user_id is required`
});

const institution_id = Joi.string().required().messages({
    "string.base": `institution_id must be a string`,
    "string.empty": `institution_id cannot be an empty`,
    "any.required": `institution_id is required`
});

const role_id = Joi.string().required().messages({
    "string.base": `role_id must be a string`,
    "string.empty": `role_id cannot be an empty`,
    "any.required": `role_id is required`
});

const start_date = Joi.string().required().messages({
    "string.base": `start_date must be a string`,
    "string.empty": `start_date cannot be an empty`,
    "any.required": `start_date is required`
});

const end_date = Joi.string().allow(null).required().messages({
    "string.base": `end_date must be a string or null`,
    "string.empty": `end_date cannot be an empty`,
    "any.required": `end_date is required`
});

const user_history_id = Joi.string().required().messages({
    "string.base": `user_history_id must be a string`,
    "string.empty": `user_history_id cannot be an empty`,
    "any.required": `user_history_id is required`
});

userHistoryValidator.add = Joi.object().keys({
    user_id,
    institution_id,
    role_id,
    start_date,
    end_date
});

userHistoryValidator.update = Joi.object().keys({
    user_history_id,
    user_id,
    institution_id,
    role_id,
    start_date,
    end_date
});

userHistoryValidator.delete = Joi.object().keys({
    user_history_id
});

export default userHistoryValidator;