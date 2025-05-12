import {Request, Response} from 'express'
import {
    createProgressEntry,
    deleteExerciseUserProgressById,
    getUserProgress
} from '../services/userExerciseProgressService'
import {USER_ROLE} from "../utils/enums";

export const handleCreateProgress = async (req: Request, res: Response) => {
    try {
        const requester = req.user as { id: number}
        const {exerciseID, duration, completedAt} = req.body
        const entry = await createProgressEntry({
            userID: requester.id,
            exerciseID,
            duration,
            completedAt
        })

        res.status(201).json({
            message: 'Progress entry created',
            data: entry
        })
    } catch (err: any) {
        console.error(err)
        res.status(400).json({message: err.message || 'Failed to create progress entry'})
    }
}

export const handleGetUserProgress = async (req: Request, res: Response) => {
    try {
        const userID = parseInt(req.params.userID)
        const requester = req.user as { id: number, role: USER_ROLE }

        if (isNaN(userID)) {
            return res.status(400).json({message: 'Invalid user ID'})
        }

        const isAdmin = requester.role === USER_ROLE.ADMIN
        const isSelf = Number(requester.id) === userID

        if (!isAdmin && !isSelf) {
            return res.status(403).json({message: `Access denied`})
        }

        const progress = await getUserProgress(userID)

        res.status(200).json({
            message: 'User progress retrieved successfully',
            data: progress
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({message: 'Failed to retrieve user progress'})
    }
}

export const handleDeleteUserExerciseProgressById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const requester = req.user as { id: number, role: USER_ROLE }

        if (isNaN(id)) {
            return res.status(400).json({message: 'Invalid exercise progress ID'})
        }

        const result = await deleteExerciseUserProgressById(id, requester.id)

        res.status(200).json({
            message: 'User progress deleted successfully',
            data: result
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({message: 'Failed to delete user progress'})
    }
}
