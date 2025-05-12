import { Request, Response } from 'express'
import {loginUser, registerUser} from '../services/authService'
import {getMessage} from "../services/localizationService";

export const handleRegister = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body)
        res.status(201).json({
            message: getMessage('userRegistered', req.language),
            ...result
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User already exists') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body)
        res.status(200).json({
            message: getMessage('userLoggedIn', req.language),
            ...result
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'Invalid email or password') {
            res.status(401).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
