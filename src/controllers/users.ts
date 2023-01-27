import { Request, Response } from 'express';
// import { v4 as uuid } from 'uuid';
import { User } from '../types/users';
import { validateUser } from '../utils/usersValidation';
import { updateExistingUser, deleteExistingUser } from '../utils/userUtils';

const users: User[] = [
    {
        id: 'bfafecad-a2d7-4a10-8c98-f1080971e485',
        login: 'mike_daws',
        password: 'test_pwd_123@',
        age: 23,
        isDeleted: false
    },
    {
        id: 'd9eeab86-409e-4280-a093-ad739d5888b1',
        login: 'joh_doe',
        password: 'qwffrt_432_@d',
        age: 27,
        isDeleted: false
    }
];

export const getAllUsers = (req: Request, res: Response) => {
    console.log(`Retrieved all Users from collection: ${JSON.stringify(users)}`);

    res.send(users);
};

export const getUserById = (req: Request, res: Response) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);

    if (!user) return res.status(404).send('The user with given id is not found');

    console.log(`Retrieved the user with the following id: ${req.params.id}`);

    res.send(user);
};

export const createUser = (req: Request, res: Response) => {
    const user = req.body as User;
    const { error } = validateUser(user);

    if (error) return res.status(400).send(error.details[0].message);

    users.push({ ...user });

    console.log(`User [${user.login}] added to the collection.`);

    res.send(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const user = users.find((user) => user.id === req.params.id);

    if (!user) return res.status(404).send('The user with given id is not found');

    const deletedUser = deleteExistingUser(user);

    console.log(`user with id ${req.params.id} has been deleted`);

    res.send(deletedUser);
};

export const updateUser =  (req: Request, res: Response) => {
    const user = users.find((user) => user.id === req.params.id);

    if (!user) return res.status(404).send('The user with given id is not found');

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedUser = updateExistingUser(user, req.body);

    console.log(`User with id: ${user.id} has been successfully updated.`);

    res.send(updatedUser);
};
