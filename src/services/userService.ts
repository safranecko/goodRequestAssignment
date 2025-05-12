import {models} from "../db";
import {USER_ROLE} from "../utils/enums";

const {
    User
} = models

interface UpdateUserInput {
    id: number
    updates: {
        name?: string
        surname?: string
        nickName?: string
        email?: string
        age?: number
        role?: USER_ROLE
    }
}

export const getAllUsers = async () => {
    return User.findAll({
        attributes: {exclude: ['password']}
    });
}

export const updateUserById = async ({ id, updates }: UpdateUserInput) => {
    const user = await User.findByPk(id)

    if (!user) {
        throw new Error('User not found')
    }

    if (updates.role && !Object.values(USER_ROLE).includes(updates.role)) {
        throw new Error('Invalid role')
    }

    await user.update(updates)

    return user
}

export const getUserById = async (id: number) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    })

    if (!user) {
        throw new Error('User not found')
    }

    return user
}