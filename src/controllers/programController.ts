import {Request, Response} from "express";
import {createProgram, getAllPrograms} from "../services/programService";

export const handleGetAllPrograms = async (req: Request, res: Response) => {
    try {
        const programs = await getAllPrograms()

        res.status(201).json({
            message: 'List of programs retrieved successfully',
            ...programs
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'List of programs not found') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export const handleCreateProgram = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const newProgram = await createProgram(name)

        res.status(201).json({
            message: 'Program created successfully',
            data: newProgram
        })
    } catch (err: any) {
        console.error(err)
        res.status(400).json({ message: err.message || 'Failed to create program' })
    }
}