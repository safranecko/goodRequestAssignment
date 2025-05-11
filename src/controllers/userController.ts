import {Request, Response} from "express";
import {getAllUsers} from "../services/userService";
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