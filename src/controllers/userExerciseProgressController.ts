import {Request, Response} from 'express'
import {
    createProgressEntry,
    deleteExerciseUserProgressById,
    getUserProgress
} from '../services/userExerciseProgressService'
import {USER_ROLE} from "../utils/enums";
import {getMessage} from "../services/localizationService";

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
            message: getMessage('progressEntryCreated', req.language),
            data: entry
        })
    } catch (err: any) {
        console.error(err)
        res.status(400).json({message: err.message || getMessage('progressEntryCreatedFailed', req.language)})
    }
}

export const handleGetUserProgress = async (req: Request, res: Response) => {
    try {
        const userID = parseInt(req.params.userID)
        const requester = req.user as { id: number, role: USER_ROLE }

        if (isNaN(userID)) {
            return res.status(400).json({message: getMessage('invalidUserID', req.language)})
        }

        const isAdmin = requester.role === USER_ROLE.ADMIN
        const isSelf = Number(requester.id) === userID

        if (!isAdmin && !isSelf) {
            return res.status(403).json({message: getMessage('accessDenied', req.language)})
        }

        const progress = await getUserProgress(userID)

        res.status(200).json({
            message: getMessage('userProgressListSuccess', req.language),
            data: progress
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({message: getMessage('userProgressListFailed', req.language)})
    }
}

export const handleDeleteUserExerciseProgressById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const requester = req.user as { id: number, role: USER_ROLE }

        if (isNaN(id)) {
            return res.status(400).json({message: getMessage('invalidExerciseProgressID', req.language)})
        }

        const result = await deleteExerciseUserProgressById(id, requester.id)

        res.status(200).json({
            message: getMessage('progressEntryDeleted', req.language),
            data: result
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({message: getMessage('progressEntryDeletedFailed', req.language)})
    }
}
