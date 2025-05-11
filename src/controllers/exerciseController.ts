import {Request, Response} from "express";
import {getAllExercises} from "../services/exerciseService";

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