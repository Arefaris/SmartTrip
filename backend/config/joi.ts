import Joi from 'joi';

// this input validation configuration

export const registerSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string()
          .min(8)
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
          .required()
          .messages({
              'string.pattern.base': 'Password must contain at least one uppercase, lowercase, and number'
          })
  });


export const loginSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string()
          .required()
  });