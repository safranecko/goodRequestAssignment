import {Request, Response} from "express";
import {getAllUsers, getUserById, updateUserById} from "../services/userService";
import {USER_ROLE} from "../utils/enums";
import {getUserProgress} from "../services/userExerciseProgressService";
import {getMessage} from "../services/localizationService";

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
            message: getMessage('usersListSuccess', req.language),
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
            return res.status(400).json({ message: getMessage('invalidUserID', req.language)})
        }

        const user = await getUserById(id)

        res.status(200).json({
            message: getMessage('userDetails', req.language),
            data: user
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User not found') {
            res.status(404).json({ message: err.message })
        } else {
            res.status(500).json({ message: getMessage('userDetailsFailed', req.language)})
        }
    }
}

export const handleGetMyProfile = async (req: Request, res: Response) => {
    try {
        const requester = req.user as { id: number}
        const user = await getUserById(requester.id)
        const userProgress = await getUserProgress(requester.id)

        res.status(200).json({
            message: getMessage('userProfile', req.language),
            data: {
                user,
                progress: userProgress
            }
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User not found') {
            res.status(404).json({ message: err.message })
        } else {
            res.status(500).json({ message: getMessage('userProfileFailed', req.language)})
        }
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: getMessage('invalidUserID', req.language)})
        }

        const updatedUser = await updateUserById({
            id,
            updates: req.body
        })

        res.status(200).json({
            message: getMessage('userUpdated', req.language),
            data: updatedUser
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User not found' || err.message === 'Invalid role') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: getMessage('userUpdatedFailed', req.language)})
        }
    }
}