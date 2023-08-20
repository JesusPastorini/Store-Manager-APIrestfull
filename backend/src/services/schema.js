const Joi = require('joi');

const salesItemSchema = Joi.object({
    productId: Joi.number().required().messages({
        'any.required': '"productId" is required',
    }),
    quantity: Joi.number().integer().min(1).required()
    .messages({
        'any.required': '"quantity" is required',
        'number.integer': '"quantity" must be an integer',
        'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

module.exports = {
    salesItemSchema,
};
