import { Request, Response } from 'express';
import { User } from '../types/users';
import { validateCreateUser, validateUpdateUser } from '../utils/usersValidation';
import { updateExistingUser, deleteExistingUser, filterDeletedUsers } from '../utils/userUtils';
import { USERS } from '../constants/userData';

export const getAllUsers = (req: Request, res: Response) => {
    const existingUsers = filterDeletedUsers(USERS);
    console.log(`Retrieved all Users from collection: ${JSON.stringify(existingUsers)}`);
    res.send(existingUsers);
};

export const getUserById = (req: Request, res: Response) => {
    const id = req.params.id;
    const user = USERS.find((user) => user.id === id);
    const isFoundUserDeleted = user.isDeleted;

    if (!user || isFoundUserDeleted) return res.status(404).send('The user with given id is not found');

    console.log(`Retrieved the user with the following id: ${req.params.id}`);

    res.send(user);
};

export const createUser = (req: Request, res: Response) => {
    const user = req.body as User;
    console.log('[createUser] user req body', user);
    const { error } = validateCreateUser(user);

    if (error) return res.status(400).send(error.details[0].message);

    USERS.push({ ...user });

    console.log(`User [${user.login}] added to the collection.`);

    res.send(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const user = USERS.find((user) => user.id === req.params.id);
    const isFoundUserDeleted = user.isDeleted;

    if (!user || isFoundUserDeleted) return res.status(404).send('The user with given id is not found or deleted');

    const deletedUser = deleteExistingUser(user);

    console.log(`user with id ${req.params.id} has been deleted`);

    res.send(deletedUser);
};

export const updateUser =  (req: Request, res: Response) => {
    const user = USERS.find((user) => user.id === req.params.id);
    const isFoundUserDeleted = user.isDeleted;

    if (!user || isFoundUserDeleted) return res.status(404).send('The user with given id is not found or deleted');

    const { error } = validateUpdateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedUser = updateExistingUser(user, req.body);

    console.log(`User with id: ${user.id} has been successfully updated.`);

    res.send(updatedUser);
};
