import {Request, Response} from "express";
import {
    createExercise,
    deleteExerciseById,
    getAllExercises,
    getExercisesByProgramId, updateExerciseById
} from "../services/exerciseService";
import {models} from "../db";
const {
    Program
} = models

export const handleGetAllExercises = async (req: Request, res: Response) => {
    try {
        const programs = await getAllExercises()

        res.status(201).json({
            message: 'List of exercises retrieved successfully',
            ...programs
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

export const handleGetExercisesByProgram = async (req: Request, res: Response) => {
    try {
        const programID = parseInt(req.params.programID)
        const programExists = await Program.findByPk(programID)

        if (isNaN(programID) || !programExists) {
            return res.status(400).json({ message: 'Invalid program ID' })
        }
        const exercises = await getExercisesByProgramId(programID)

        res.status(200).json({
            message: 'Exercises retrieved successfully',
            data: exercises
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({ message: 'Failed to retrieve exercises' })
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