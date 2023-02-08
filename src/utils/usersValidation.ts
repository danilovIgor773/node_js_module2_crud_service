import Joi from 'joi';
import { User } from '../types/users';
import { USERS } from '../constants/userData';

const _validateLoginInUse = (login: string, helper: Joi.CustomHelpers<unknown>) => {
    const exisitingLogin = USERS.find(user => user.login === login)?.login || '';
    if (exisitingLogin === login) {
        return helper.message({
            custom: 'Login is already in use'
        });
    }
    return login;
};

const _validateIDInUse = (id: string, helper: Joi.CustomHelpers<unknown>) => {
    const exisitingID = USERS.find(user => user.id === id)?.id || '';
    if (exisitingID === id) {
        return helper.message({
            custom: 'ID is already in use'
        });
    }
    return id;
};

const createUserValidationSchema = Joi.object().keys({
    id: Joi.string()
        .custom(_validateIDInUse)
        .required(),
    login: Joi.string()
        .custom(_validateLoginInUse)
        .alphanum().min(3).max(30).required(),
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

const updateUserValidationSchema = Joi.object().keys({
    id: Joi.string()
        .required(),
    login: Joi.string()
        .custom(_validateLoginInUse)
        .alphanum().min(3).max(30).required(),
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

export const validateCreateUser = (user: User) => {
    return createUserValidationSchema.validate(user, { abortEarly: false });
};

export const validateUpdateUser = (user: User) => {
    return updateUserValidationSchema.validate(user, { abortEarly: false });
};
