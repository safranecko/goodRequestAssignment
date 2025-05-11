import {models} from "../db";

const {
    User
} = models

export const getAllUsers = async () => {
    return User.findAll({
        attributes: {exclude: ['password']}
    });
}