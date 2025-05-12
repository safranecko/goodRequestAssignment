import {Request, Response} from "express";
import {
    createExercise,
    deleteExerciseById,
    getExercisesFiltered,
    updateExerciseById
} from "../services/exerciseService";

export const handleGetExercises = async (req: Request, res: Response) => {
    try {
        const { programID, search, page = '1', limit = '10' } = req.query

        const exercises = await getExercisesFiltered({
            programID: programID ? Number(programID) : undefined,
            search: search as string,
            page: Number(page),
            limit: Number(limit)
        })

        res.status(201).json({
            message: 'List of exercises retrieved successfully',
            ...exercises
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'List of exercises not found') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export const handleCreateExercise = async (req: Request, res: Response) => {
    try {
        const { name, difficulty, programID } = req.body
        const exercise = await createExercise({ name, difficulty, programID })

        res.status(201).json({
            message: 'Exercise created successfully',
            data: exercise
        })
    } catch (err: any) {
        console.error(err)
        res.status(400).json({ message: err.message || 'Failed to create exercise' })
    }
}

export const handleDeleteExercise = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid exercise ID' })
        }

        const result = await deleteExerciseById(id)

        res.status(200).json(result)
    } catch (err: any) {
        console.error(err)
        if (err.message === 'Exercise not found') {
            res.status(404).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Failed to delete exercise' })
        }
    }
}

export const handleUpdateExercise = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid exercise ID' })
        }

        const updatedExercise = await updateExerciseById({
            id,
            updates: req.body
        })

        res.status(200).json({
            message: 'Exercise updated successfully',
            data: updatedExercise
        })
    } catch (err: any) {
        console.error(err)
        if (
            ['Exercise not found', 'Invalid difficulty value', 'Program does not exist'].includes(err.message)
        ) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Failed to update exercise' })
        }
    }
}