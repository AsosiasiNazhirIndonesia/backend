import Joi from "joi";

const certificateTypeValidator = {}

const certificate_type = Joi.string().required().messages({
    "string.base": `certificate_type must be a string`,
    "string.empty": `certificate_type cannot be an empty`,
    "any.required": `certificate_type is required`
});

const certificate_type_id = Joi.string().required().messages({
    "string.base": `certificate_type_id must be a string`,
    "string.empty": `certificate_type_id cannot be an empty`,
    "any.required": `certificate_type_id is required`
});


certificateTypeValidator.add = Joi.object().keys({
    certificate_type
});

certificateTypeValidator.update = Joi.object().keys({
    certificate_type,
    certificate_type_id
});

certificateTypeValidator.delete = Joi.object().keys({
    certificate_type_id
})

export default certificateTypeValidator;
