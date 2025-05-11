import {Request, Response} from "express";
import {getAllUsers, getUserById, updateUserById} from "../services/userService";
import {USER_ROLE} from "../utils/enums";

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const role = (req.user as { role: USER_ROLE }).role
        const users = await getAllUsers()

        const filteredUsers = users.map((user: any) => {
            if (role === USER_ROLE.ADMIN) {
                return user
            } else {
                return {
                    id: user.id,
                    nickName: user.nickName
                }
            }
        })

        res.status(201).json({
            message: 'Users list retrieved successfully',
            ...filteredUsers
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'Users list not found') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export const handleGetUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }

        const user = await getUserById(id)

        res.status(200).json({
            message: 'User details retrieved successfully',
            data: user
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User not found') {
            res.status(404).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Failed to retrieve user details' })
        }
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }

        const updatedUser = await updateUserById({
            id,
            updates: req.body
        })

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User not found' || err.message === 'Invalid role') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Failed to update user' })
        }
    }
}