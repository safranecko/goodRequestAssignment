import {Request, Response} from "express";
import {createProgram, getAllPrograms} from "../services/programService";
import {getMessage} from "../services/localizationService";

export const handleGetAllPrograms = async (req: Request, res: Response) => {
    try {
        const programs = await getAllPrograms()

        res.status(201).json({
            message: getMessage('programListSuccess', req.language),
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
            message: getMessage('programCreated', req.language),
            data: newProgram
        })
    } catch (err: any) {
        console.error(err)
        res.status(400).json({ message: err.message || getMessage('programCreatedFailed', req.language)})
    }
}