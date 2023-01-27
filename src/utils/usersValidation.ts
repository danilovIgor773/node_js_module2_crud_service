import Joi from 'joi';
import { User } from '../types/users';

const validationSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password should be between 3 to 30 characters and contain letters or numbers only',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
        }),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const validateUser = (user: User) => {
    return validationSchema.validate(user);
};
