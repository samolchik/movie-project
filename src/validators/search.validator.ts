import Joi from "joi";

const searchValidator = Joi.object({
    searchText: Joi.string().min(1).required().messages({
        'string.required': 'Required field'
})});

export {
    searchValidator
};