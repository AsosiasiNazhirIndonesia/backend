import Joi from "joi";

const userValidator = {}

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

const public_key = Joi.string().required().messages({
    "string.base": `public_key must be a string`,
    "string.empty": `public_key cannot be an empty`,
    "any.required": `public_key is required`
});

const phone_number = Joi.string().required().messages({
    "string.base": `phone_number must be a string`,
    "string.empty": `phone_number cannot be an empty`,
    "any.required": `phone_number is required`
});

const photo = Joi.string().allow(null).required().messages({
    "string.base": `photo must be a string`,
    "string.empty": `photo cannot be an empty`,
    "any.required": `photo is required`
});

const user_id = Joi.string().allow(null).required().messages({
    "string.base": `user_id must be a string`,
    "string.empty": `user_id cannot be an empty`,
    "any.required": `user_id is required`
});

userValidator.add = Joi.object().keys({
    name,
    email,
    phone_number,
    photo,
    public_key
});

userValidator.update = Joi.object().keys({
    user_id,
    name,
    email,
    phone_number,
    photo,
    public_key
});

export default userValidator;