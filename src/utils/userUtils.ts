import { User } from '../types/users';

export const updateExistingUser = (existingUser: User, payload: User): User => {
    return {
        ...existingUser,
        login: payload.login,
        password: payload.password,
        age: payload.age
    } as User;
};

export const deleteExistingUser = (existingUser: User): User => {
    return {
        ...existingUser,
        isDeleted: true
    } as User;
};
