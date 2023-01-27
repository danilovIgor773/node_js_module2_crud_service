import { User } from '../types/users';

export const updateExistingUser = (existingUser: User, payload: User): User => {
    existingUser.login =  payload.login;
    existingUser.password = payload.password;
    existingUser.age = payload.age;

    return existingUser;
};

export const deleteExistingUser = (existingUser: User): User => {
    existingUser.isDeleted = true;
    return existingUser;
};
